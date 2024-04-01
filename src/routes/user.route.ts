import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { RegisterUserSchema, LoginUserSchema } from '../validations/user.validation.js';

const userRouter = Router();

// POST endpoint for user registration
userRouter.post('/register', validate(RegisterUserSchema), register);

// POST endpoint for user login
userRouter.post('/login', validate(LoginUserSchema), login);

export default userRouter;