import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validateUser.middleware.js";
import { handleValidationErrors } from "../middlewares/handleValidation.js";
import { authRequired, isAdmin } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/users", authRequired, getUsers);
router.get("/users/:id", authRequired, getUser);
router.post("/users", authRequired, validateUser, handleValidationErrors, createUser);
router.put("/users/:id", authRequired, validateUser, handleValidationErrors, updateUser);
router.delete("/users/:id", authRequired, isAdmin, deleteUser);


export default router;
