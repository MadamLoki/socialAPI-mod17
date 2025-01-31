import express, { Router, Request, Response } from 'express';
import userController from '../../controllers/userController.js';

const router : Router = express.Router();

// - GET /api/users         # Get all users
router.get('/', async (req: Request, res: Response) =>
    await userController.getUsers(req, res)
);

// - GET /api/users/:id      # Get single user
router.get('/:id', async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
});

// - POST /api/users         # Create user
router.post('/', async (req: Request, res: Response) => {
    await userController.createUser(req, res);
});

// - PUT /api/users/:id      # Update user
router.put('/:id', async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
});

// - DELETE /api/users/:id   # Delete user
router.delete('/:id', async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
});

export default router;