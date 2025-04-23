import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import { handleValidationErrors } from "../middlewares/handleValidation.js";

const router = Router();

router.get("/users", authRequired, getUsers);
router.get("/users/:id", authRequired, getUser);
router.post("/users", authRequired, validateUser, handleValidationErrors, createUser);
router.put("/users/:id", authRequired, validateUser, handleValidationErrors, updateUser);
router.delete("/users/:id", authRequired, deleteUser);

export default router;
