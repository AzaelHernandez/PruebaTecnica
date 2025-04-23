import User from "../models/user.models.js";
import bcrypt from "bcryptjs";


// GET /api/users?search=juan&page=1&limit=10
export const getUsers = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ]
    };    

    try {
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await User.countDocuments(query);

        res.json({
            users,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
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

// POST /api/users
export const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
        status,
        address,
        profilePicture
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            status,
            address,
            profilePicture
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.log("Error al crear usuario:", error); 
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};


// PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario" });
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
