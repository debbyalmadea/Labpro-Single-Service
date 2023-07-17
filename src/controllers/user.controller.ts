import { Request, Response } from "express";
import { UserService } from "../services";

class UserController {
    async getSelfDetail(req: Request, res: Response) {
        const data = await UserService.getUserByUsername(res.locals.username);

        if (!data) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: null
            });
        } else {
            return res.status(200).json({
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