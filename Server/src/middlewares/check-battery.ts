import { NextFunction, Request, Response } from 'express';
import { AttachmentKey } from '../shared/attachments';
import { QueryKey } from '../shared/types';
import { BadRequestError } from './error';

export const FilterBatteryKey = AttachmentKey.from<QueryKey>('battery-list-filter');

type QueryPredicate = (query: QueryKey) => boolean;

export default (predicate?: QueryPredicate) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const andQuery = [{}] as any;
    const matchQuery = [{}] as any

    if(req.query.postCodeStart) {
      andQuery.push({ postCode: { $gte: req.query.postCodeStart } });
    }
    if(req.query.postCodeEnd) {
      andQuery.push({ postCode: { $lte: req.query.postCodeEnd } });
    }
    if(req.query.query) {
      andQuery.push({
        name: { $regex: new RegExp(String(req.query.query), 'i') }, // Case-insensitive search
    })
    }


    const orQuery = [
      {},
    ]as any;
  
    const query = {
      $and: andQuery,
      $or: orQuery,
    };
    
    if (predicate && !predicate(query)) {
      throw new BadRequestError('Invalid Data');
    }
    
    req.attachments.put(FilterBatteryKey, query);
    return next();
  };
};

