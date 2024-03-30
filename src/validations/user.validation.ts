import Joi from 'joi';

export const RegisterUserSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid("admin", "guest").optional()
    }) 
};

export const LoginUserSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    }) 
};
