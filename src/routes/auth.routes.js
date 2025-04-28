// src/routes/auth.routes.js
import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateLogin } from '../middlewares/validateLogin.middleware.js';
import { handleValidationErrors } from '../middlewares/handleValidation.js';

const router = Router();

router.post('/register', register);
router.post('/login', validateLogin, handleValidationErrors, login); // Validación añadida
export default router;
