import { Request, Response } from "express";
import { AuthService } from "../services";
import { HttpStatusCode } from "../common/types";

class AuthController {
    async logIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const data = await AuthService.logIn(username, password);

        return res.status(HttpStatusCode.Accepted).json({
            status: "success",
            message: "Log in Success!",
            data: data
        });
    }
}

export default new AuthController();