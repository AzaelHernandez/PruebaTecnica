import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const createAdminUser = async () => {
    const exist = await User.findOne({ email: "admin@example.com" });
    if (exist) return;

    const hashedPassword = await bcrypt.hash("password", 10);
    const admin = new User({
        firstName: "Admin",
        lastName: "Root",
        email: "admin@example.com",
        password: hashedPassword,
        role: "Administrador",
        status: "Activo"
    });
    

    await admin.save();
    console.log("Usuario admin creado");
};
