import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi'; // because I used Joi for schema validation

export default (schema: {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (schema.body) {
      req.body = await schema.body.validateAsync(req.body);
    }

    if (schema.query) {
      req.query = await schema.query.validateAsync(req.query);
    }

    if (schema.params) {
      req.params = await schema.params.validateAsync(req.params);
    }
    
    next();
  };
};
