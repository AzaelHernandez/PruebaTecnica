import { body } from "express-validator";

export const validateUser = [
  body("firstName")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),

  body("lastName")
    .notEmpty().withMessage("El apellido es obligatorio")
    .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),

  body("email")
    .notEmpty().withMessage("El correo electrónico es obligatorio")
    .isEmail().withMessage("Debe ser un correo electrónico válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("Debe tener al menos 6 caracteres"),
];
