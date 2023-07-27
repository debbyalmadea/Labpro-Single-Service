import { Request, Response } from "express";
import { JsonResponse } from "../utils";
import { IUserController, IUserService } from "../common/types";

class UserController implements IUserController {
    constructor(private userService: IUserService) {
        this.getSelfDetail = this.getSelfDetail.bind(this);
    }

    async getSelfDetail(req: Request, res: Response) {
        const data = await this.userService.getUserByUsername(res.locals.user.username);

        return (new JsonResponse(res)).success()
            .withData({
                username: data.username,
                name: data.name
            }).make();
    }
}

export default UserController;