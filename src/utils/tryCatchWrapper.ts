import { Request, Response } from "express";
import HttpError from "./httpError";
import { HttpStatusCode } from "../common/types";

const tryCatchWrapper = (
    handler: (req: Request, res: Response) => Promise<Response>
) => {
    return async (req: Request, res: Response) => {
        try {
          await handler(req, res);
        } catch (error) {
          console.log('error', error);
          if (error instanceof HttpError) {
            return res.status(error.statusCode).json({
              status: 'error',
              message: error.message,
              data: error.data,
            });
          }

          return res.status(HttpStatusCode.InternalServerError).json({
            status: 'error',
            message: 'Something went wrong while processing your request',
            data: null,
          });
        }
    };
}

export default tryCatchWrapper;