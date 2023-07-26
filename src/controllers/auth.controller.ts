import { Request, Response } from "express";
import { AuthService } from "../services";
import { JsonResponse } from "../utils";

class AuthController {
    async logIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const data = await AuthService.logIn(username, password);

        return (new JsonResponse(res))
                .success()
                .withData(data)
                .withMessage('Log in berhasil')
                .make();
    }
}

export default new AuthController();