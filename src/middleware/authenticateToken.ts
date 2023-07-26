import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from "../configs";
import { HttpStatusCode } from "../common/types";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
        let token = authHeader;
        
        if (!token) {
            return res.status(HttpStatusCode.Unauthorized).json({
              status: "error",
              message: "Unauthorized",
              data: null
            });
          }
        
        if(token?.includes('Bearer')) {
          token = token.split(' ')[1]
        }

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
              return res.status(HttpStatusCode.Forbidden).json({
                status: "error",
                message: "Forbidden",
                data: null
              })
            }
        
            res.locals.user = user;
            next();
        });
}

export default authenticateToken;