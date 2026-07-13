import { Router } from 'express';
import { validate } from '../middleware/validationMiddleware.js';
import { registerSchema} from '../schemas/userSchemas.js';

export const createAuthRoutes = (authController) => {
    const router = Router();
    router.post('/login', validate, authController.loginUser);
    router.post('/register', validate(registerSchema), authController.registerUser);
    router.post('/logout', authController.logoutUser);
    return router;
}; 