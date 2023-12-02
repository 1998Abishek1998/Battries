import { ErrorRequestHandler, Response, Request, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';

import { CustomError, DuplicateRowError, UnexpectedError, ValidationFailedError } from './error';
import { ExtractedErrorsType } from '../shared/types';

interface JsonResponse {
  failed: boolean;
  message: string;
  errors?: ExtractedErrorsType;
}

const handleError: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (!(err instanceof CustomError) || err instanceof UnexpectedError) {
    console.log(err);
  }
  const status = err instanceof CustomError ? err.httpStatus : StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status);

  const payload: JsonResponse = { failed: true, message: err.message};
  if (err instanceof ValidationFailedError) {
    payload.errors = err.errors;
  }

  if (err instanceof DuplicateRowError) {
    payload.errors = {
      [err.key]: [`${err.key} already used`],
    };
  }

  console.log({
    status: status,
    payload: payload
  });

  res.status(status).json(payload);
};

export default handleError;
