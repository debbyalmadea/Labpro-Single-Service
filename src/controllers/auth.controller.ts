import { Request, Response } from "express";
import { AuthService } from "../services";

class AuthController {
    async logIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const data = await AuthService.logIn(username, password);

        return res.status(200).json({
            status: "success",
            message: "Log in Success!",
            data: data
        });
    }
}

export default new AuthController();