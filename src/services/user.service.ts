import { HttpStatusCode, UserModel, IUserService } from "../common/types";
import { HttpError } from "../utils";

class UserService implements IUserService {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async getUserByUsername(username: string) {
        const user = await this.userModel.findFirst({
            where: {
                username: username
            }
        })

        if (!user) {
            throw new HttpError(HttpStatusCode.NotFound, "User not found")
        }

        return user
    }
}

export default UserService;