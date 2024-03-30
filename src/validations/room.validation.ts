import Joi from 'joi';
import { validateObjectId } from '../utils/id.util.ts';

export const CreateRoomSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        roomType: Joi.string().custom(validateObjectId, 'object id validation').required()
    })
};
