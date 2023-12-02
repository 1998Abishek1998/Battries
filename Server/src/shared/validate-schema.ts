import { SafeParseReturnType, Schema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ExtractedErrorsType } from './types';
import { ValidationFailedError } from '../middlewares/error';

export default (schema: Schema) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    
    if(req.originalUrl.match('/battries')) next()
    else {
      let parsed = {} as SafeParseReturnType<any, any>;
    
        if (req.method.toUpperCase() === 'GET') {
          console.log('Incoming query params : ',req.query);
          parsed = schema.safeParse(req.query);
        }else {
          console.log(JSON.stringify(req.body));
          parsed = schema.safeParse(req.body);
        }
      
        if (!parsed.success) {
          const errors = parsed.error.issues
          .map(issue => [issue.path.join('.'), issue.message])
          .reduce((acc, [key, msg]) => {
            if (key in acc) {
              acc[key].push(msg);
            } else {
              acc[key] = [msg];
            }
            return acc;
          }, {} as ExtractedErrorsType);

        throw new ValidationFailedError('validation failed', errors);
      }
      req.body = parsed.data;
      next();
    }
  };
};
