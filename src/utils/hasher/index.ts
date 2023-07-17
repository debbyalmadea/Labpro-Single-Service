import { genSalt, hash } from "bcryptjs";

const hasher = async (str: string) => hash(str, await genSalt())

export default hasher;