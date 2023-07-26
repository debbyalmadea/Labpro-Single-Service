import { Request, Response } from "express";
import { JsonResponse } from "../utils";
import { IUserController, IUserService } from "../common/types";

class UserController implements IUserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async getSelfDetail(req: Request, res: Response) {
        console.log(res.locals.user);
        const data = await this.userService.getUserByUsername(res.locals.user.username);

        return (new JsonResponse(res)).success()
            .withData({
                username: data.username,
                name: data.name
            }).make();
    }
}

export default UserController;