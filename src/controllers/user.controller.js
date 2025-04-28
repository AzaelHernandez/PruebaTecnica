import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

// GET /api/users?search=juan&page=1&limit=10
export const getUsers = async (req, res) => {
    const { page = 1, limit = 10, search = "", role, status } = req.query;
    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    if (role) query.role = role;
    if (status) query.status = status;

    try {
      const users = await User.find(query)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(Number(limit));

      const total = await User.countDocuments(query);

      res.json({
        data: users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
        message: "Usuarios obtenidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

// GET /api/users/:id
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};
export const createUser = async (req, res) => {
    try {
      console.log("Body recibido:", req.body); // Agrega esto para debug
      const { longitude, latitude, ...rest } = req.body;
      const hashedPassword = await bcrypt.hash(rest.password, 10);
      
      const newUser = new User({
        ...rest,
        password: hashedPassword,
        address: {
          ...rest.address,
          ...(longitude && latitude ? {
            location: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            }
          } : {})
        }
      });

      const savedUser = await newUser.save();
      savedUser.password = undefined;

      res.status(201).json({
        data: savedUser,
        message: "Usuario creado exitosamente",
      });
    } catch (error) {
      console.error("Error completo:", error); // Log completo del error
      if (error.code === 11000) {
        res.status(400).json({ 
          message: "El email ya está registrado",
          error: error.message 
        });
      } else {
        res.status(500).json({ 
          message: "Error al crear el usuario",
          error: error.message // Envía solo el mensaje de error
        });
      }
    }
};

// PUT /api/users/:id (CON GOOGLE MAPS)
export const updateUser = async (req, res) => {
    try {
      const { password, longitude, latitude, ...rest } = req.body;

      const updates = { ...rest };
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }

      // Añade coordenadas solo si vienen ambas
      if (longitude && latitude) {
        updates.address = {
          ...updates.address,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          }
        };
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({
        data: updatedUser,
        message: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
};