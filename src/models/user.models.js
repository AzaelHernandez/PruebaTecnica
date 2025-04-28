import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["Administrador", "Usuario"],
    default: "Usuario"
  },
  status: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
  },
  address: {
    type: {
      street: {
        type: String,
        trim: true,
        minlength: [2, "La calle debe tener al menos 2 caracteres"],
      },
      number: {
        type: String,
        trim: true,
        validate: {
          validator: (v) => /^[0-9a-zA-Z\- ]+$/.test(v), // Permite números, letras, guiones y espacios
          message: "El número debe ser alfanumérico (ej. '123' o '12A')",
        },
      },
      city: {
        type: String,
        trim: true,
        minlength: [2, "La ciudad debe tener al menos 2 caracteres"],
      },
      postalCode: {
        type: String,
        trim: true,
        validate: {
          validator: (v) => /^[0-9\-]+$/.test(v), // Permite números y guiones
          message: "El código postal debe contener solo números y guiones",
        },
      },
      location: { // Nuevo campo para coordenadas
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitud, latitud]
          default: [0, 0],
        },
      },
    },
    required: false, // Sigue siendo opcional
  },
  profilePicture: String, // URL
}, {
  timestamps: true
});


userSchema.index({ "address.location": "2dsphere" }); // <-- Línea clave
export default mongoose.model("User", userSchema);
