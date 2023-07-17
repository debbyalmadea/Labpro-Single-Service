import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { accessTokenSecret } from "../configs";
import { HttpStatusCode } from "../common/types";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
        const token = authHeader;

        if (!token) {
            return res.status(HttpStatusCode.Unauthorized).json({
                status: "error",
                message: "Unauthorized",
                data: null
            });
        }

        jwt.verify(token, accessTokenSecret, (err, username) => {
            if (err) {
              return res.status(HttpStatusCode.Forbidden).json({
                status: "error",
                message: "Forbidden",
                data: null
              })
            }
        
            res.locals.username = username;
            next();
        });
}

export default authenticateToken;