import { compare } from "bcryptjs";
import { HttpError } from "../utils";
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from "../configs";
import { HttpStatusCode, IAuthService, IUserService } from "../common/types";

class AuthService implements IAuthService {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async logIn(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);

        const validPassword = await compare(
            password,
            user.password,
        );

        if (!validPassword) {
            throw new HttpError(HttpStatusCode.Unauthorized, 'Invalid password');
        }

        const accessToken = jwt.sign(
            {
                username: user.username,
                name: user.name
            },
            accessTokenSecret
        );

        return { 
            user: { 
                username: user.username,
                name: user.name
            },
            token: accessToken,
        }
    }
}

export default AuthService;