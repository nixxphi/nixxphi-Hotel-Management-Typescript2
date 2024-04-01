// OBJECT ID VALIDATOR. 
const ObjectId = require('mongoose').Types.ObjectId;

const validateObjectId = (id: string) => {
  if (!id || typeof id !== 'string') {
    return false;
  }
  return ObjectId.isValid(id);
};

module.exports = {
  validateObjectId
};
