import { Request, Response } from "express";
import { UserService } from "../services";
import { HttpStatusCode } from "../common/types";
import { JsonResponse } from "../utils";

class UserController {
    async getSelfDetail(req: Request, res: Response) {
        console.log(res.locals.user);
        const data = await UserService.getUserByUsername(res.locals.user.username);

        const jsonResponse = new JsonResponse(res);
        if (!data) {
            return jsonResponse.error(HttpStatusCode.NotFound)
                    .withMessage("User not found")
                    .make();
        } else {
             return jsonResponse.success()
                    .withData({
                        username: data.username,
                        name: data.name
                    }).make();
        }
    }
}

export default new UserController();