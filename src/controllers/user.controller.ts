import { Request, Response } from "express";
import { UserService } from "../services";
import { HttpStatusCode } from "../common/types";

class UserController {
    async getSelfDetail(req: Request, res: Response) {
        const data = await UserService.getUserByUsername(res.locals.username);

        if (!data) {
            return res.status(HttpStatusCode.NotFound).json({
                status: "error",
                message: "User not found",
                data: null
            });
        } else {
            return res.status(HttpStatusCode.Accepted).json({
                status: "success",
                message: "Successfully retrieve data",
                data: {
                    username: data.username,
                    name: data.name
                }
            });
        }
    }
}

export default new UserController();