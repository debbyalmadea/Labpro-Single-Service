import { Request, Response } from "express";
import HttpError from "./httpError";
import { HttpStatusCode } from "../common/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const tryCatchWrapper = (
    handler: (req: Request, res: Response) => Promise<Response>
) => {
    return async (req: Request, res: Response) => {
        try {
          await handler(req, res);
        } catch (error) {
          if (error instanceof HttpError) {
            return res.status(error.statusCode).json({
              status: 'error',
              message: error.message,
              data: error.data,
            });
          }

          if (error instanceof PrismaClientKnownRequestError) {
            res.status(HttpStatusCode.BadRequest).json({
              status: 'error',
              message: error.message,
              data: null,
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