import Joi from 'joi';
import { validateObjectId } from '../utils/id.util.ts';

export const CreateRoomTypeSchema = {
    body: Joi.object({
        name: Joi.string().required()
    })
};

export const EditRoomTypeSchema = {
    body: Joi.object({
        name: Joi.string().required()
    }),
    params: Joi.object({
        id: Joi.string().custom(validateObjectId, 'object id validation').required()
    })
};
