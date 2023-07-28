import { Request, Response } from "express";
import { Handler } from "../common/types";
import { errorHandlerChain } from ".";

const tryCatchWrapper = (
    handler: Handler
) => {
    return async (req: Request, res: Response) => {
        try {
          await handler(req, res);
        } catch (error) {   
          errorHandlerChain.handle(res, error);
        }
    };
}

export default tryCatchWrapper;