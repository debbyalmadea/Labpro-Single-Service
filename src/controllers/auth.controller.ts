import { Request, Response } from "express";
import { JsonResponse } from "../utils";
import { IAuthController, IAuthService } from "../common/types";

class AuthController implements IAuthController {
    constructor(private authService: IAuthService) {
        this.logIn = this.logIn.bind(this);
    }

    async logIn(req: Request, res: Response) {
        const { username, password } = req.body;
        const data = await this.authService.logIn(username, password);

        return (new JsonResponse(res))
                .success()
                .withData(data)
                .withMessage('Log in berhasil')
                .make();
    }
}

export default AuthController;