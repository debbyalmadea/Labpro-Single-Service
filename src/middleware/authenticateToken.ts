import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from "../configs";
import { HttpStatusCode } from "../common/types";
import { HttpError, errorHandlerChain } from "../utils";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader;
    
    if (!token) {
      throw new HttpError(HttpStatusCode.Unauthorized, 'Unauthorized')
      }
    
    if(token?.includes('Bearer')) {
      token = token.split(' ')[1]
    }

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          throw new HttpError(HttpStatusCode.Forbidden, 'Forbidden')
        }
    
        res.locals.user = user;
        next();
    });
  } catch (error) {
    errorHandlerChain.handle(res, error);
  }
}

export default authenticateToken;