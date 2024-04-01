import joi from 'joi';
import validateObjectId  from '../utils/id.util.js'

export const CreateRoomSchema = {
    body: joi.object({
      name: joi.string().required(),
      price: joi.number().required(),
      roomType: joi.string().custom(validateObjectId, 'object id validation').required()
    }) 
}