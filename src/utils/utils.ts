import { Types } from 'mongoose';

// OBJECT ID VALIDATOR.
const { ObjectId } = Types;

export const validateObjectId = (id: string): boolean => {
  if (!id || typeof id !== 'string') {
    return false;
  }
  return ObjectId.isValid(id);
};
