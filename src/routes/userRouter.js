import { Router } from 'express';

export const createUserRoutes = (userController) => {
  const router = Router();
  router.get('/:id', userController.getUser);
  return router;
};