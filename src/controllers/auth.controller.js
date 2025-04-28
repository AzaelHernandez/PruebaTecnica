import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTRO
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        res.json({
            id: userSaved._id,
            firstName: userSaved.firstName,
            lastName: userSaved.lastName,
            email: userSaved.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

//LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Credenciales inválidas" }); // Mensaje genérico por seguridad
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" }); // Mismo mensaje para evitar leaks
    }

    // Token con más datos útiles (ej. role)
    const token = jwt.sign(
      {
        id: userFound._id,
        email: userFound.email,
        role: userFound.role, // Añadido para autorización
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respuesta con datos relevantes
    res.json({
      token,
      user: {
        id: userFound._id,
        email: userFound.email,
        role: userFound.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};