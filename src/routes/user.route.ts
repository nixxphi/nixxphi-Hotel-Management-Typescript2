import { Router } from 'express';
import { register, login } from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import { RegisterUserSchema, LoginUserSchema } from '../validations/user.validation';

const userRouter = Router();

// POST endpoint for user registration
userRouter.post('/register', validate(RegisterUserSchema), register);

// POST endpoint for user login
userRouter.post('/login', validate(LoginUserSchema), login);

export default userRouter;
