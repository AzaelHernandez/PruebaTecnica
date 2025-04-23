import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import User from "../models/user.models.js";

// Conexión a la base de datos
mongoose.connect("mongodb://localhost/merndb").then(() => {
  console.log("🔌 Conectado a la base de datos");

  const seedUsers = async () => {
    try {
      // Eliminar usuarios excepto el admin
      await User.deleteMany({ email: { $ne: "admin@example.com" } });

      const users = [];

      for (let i = 0; i < 50; i++) {
        const password = await bcrypt.hash("123456", 10);
        users.push(new User({
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password,
          role: faker.helpers.arrayElement(["Usuario", "Administrador"]),
          status: faker.helpers.arrayElement(["Activo", "Inactivo"]),
          address: {
            street: faker.location.street(),
            number: faker.string.numeric({ length: { min: 1, max: 3 } }),
            city: faker.location.city(),
            postalCode: faker.location.zipCode(),
          },
          profilePicture: faker.image.avatar()
        }));
      }

      const result = await User.insertMany(users);
      console.log(`${result.length} usuarios sembrados con éxito\n`);

      console.log("Ejemplo de los primeros 5 usuarios:");
      result.slice(0, 5).forEach((user, index) => {
        console.log(`\nUsuario #${index + 1}`);
        console.log(`- Username: ${user.username}`);
        console.log(`- Email: ${user.email}`);
        console.log(`- Nombre: ${user.firstName} ${user.lastName}`);
      });

      process.exit();
    } catch (error) {
      console.error("❌ Error al sembrar usuarios:", error);
      process.exit(1);
    }
  };

  seedUsers();
});
