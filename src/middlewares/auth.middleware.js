import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../libs/config.js";

export const authRequired = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Ahora incluye req.user.role
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
  
  // Middleware para verificar rol de admin
  export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "Administrador") {
      return res.status(403).json({ 
        message: "Acceso denegado: se requiere rol de administrador",
        error: `Rol actual: ${req.user?.role || "No definido"}` // Para depuración
      });
    }
    next();
  };

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
