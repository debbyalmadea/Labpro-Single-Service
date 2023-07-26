import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { errorHandlerChain } from ".";

const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
        errorHandlerChain.handle(res, error);
    }
};

export default validate;