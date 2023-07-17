import { compare } from "bcryptjs";
import { HttpError } from "../utils";
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from "../configs";
import { UserService } from ".";
import { HttpStatusCode } from "../common/types";

class AuthService {
    async logIn(username: string, password: string) {
        const user = await UserService.getUserByUsername(username);

        if (!user) {
            throw new HttpError(HttpStatusCode.NotFound, 'User not found');
        }

        const validPassword = await compare(
            password,
            user.password,
        );

        if (!validPassword) {
            throw new HttpError(HttpStatusCode.Unauthorized, 'Invalid password');
        }

        const accessToken = jwt.sign(
            username,
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

export default new AuthService();