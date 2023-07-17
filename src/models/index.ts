import { prisma } from "../utils";

const User = prisma.user;
const Barang = prisma.barang;
const Perusahaan = prisma.perusahaan;

export {
    User,
    Barang,
    Perusahaan
}