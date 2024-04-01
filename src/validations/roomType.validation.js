import joi from 'joi';
import validateObjectId  from '../utils/id.util.js'

export const CreateRoomTypeSchema = {
    body: joi.object({
      name: joi.string().required()
    }) 
}

export const EditRoomTypeSchema = {
  body: joi.object({
    name: joi.string().required()
  }),
  params: joi.object({
    id: joi.string().custom(validateObjectId, 'object id validation').required()
  })
}