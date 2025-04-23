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
    street: String,
    number: String,
    city: String,
    postalCode: String
  },
  profilePicture: String, // URL
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
