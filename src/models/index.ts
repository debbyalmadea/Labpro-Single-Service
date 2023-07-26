import { BarangModel, PerusahaanModel, UserModel } from "../common/types";
import { prisma } from "../utils";

const User: UserModel = prisma.user;
const Barang: BarangModel = prisma.barang;
const Perusahaan: PerusahaanModel = prisma.perusahaan;

export {
    User,
    Barang,
    Perusahaan
}