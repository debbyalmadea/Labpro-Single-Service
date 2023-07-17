import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

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
        if (error instanceof ZodError) {
            return res.status(400).json({
              status: 'error',
              message: error.issues[0].message,
              data: null,
            });  
        }

        return res.status(400).json({
            status: 'error',
            message: 'Something went wrong while processing your request',
            data: null,
        })
    }
};

export default validate;