import { Router } from 'express';

export const createAuthRoutes = (authController) => {
    const router = Router();
    router.post('/login', authController.loginUser);
    router.post('/register', authController.registerUser);
    return router;
};