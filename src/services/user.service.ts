import { User } from "../models";

class UserService {
    async getUserByUsername(username: string) {
        const user = await User.findFirst({
            where: {
                username: username
            }
        })

        if (!user) {
            return null;
        }

        return user
    }
}

export default new UserService();