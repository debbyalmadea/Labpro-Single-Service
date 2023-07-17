import { compare } from "bcryptjs";
import { HttpError } from "../utils";
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from "../configs";
import { UserService } from ".";

class AuthService {
    async logIn(username: string, password: string) {
        const user = await UserService.getUserByUsername(username);

        if (!user) {
            throw new HttpError(401, 'User not found');
        }

        const validPassword = await compare(
            password,
            user.password,
        );

        if (!validPassword) {
            throw new HttpError(400, 'Invalid password');
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