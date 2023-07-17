import { Perusahaan } from "../models";

class PerusahaanService {
    async getAllPerusahaan() {
        return await Perusahaan.findMany();
    }

    async searchPerusahaan(q?: string) {
        const perusahaanList = await Perusahaan.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: q ?? "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: q ?? "",
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        })

        return perusahaanList;
    }

    async getPerusahaanById(id: string) {
        const perusahaan = await Perusahaan.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        });

        return perusahaan;
    }

    async getPerusahaanByNama(nama: string) {
        const perusahaan = await Perusahaan.findFirst({
            where: {
                nama: nama
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        })

        return perusahaan;
    }

    async createPerusahaan(nama: string, alamat: string, no_telp: string, kode: string) {
        const createdPerusahaan = await Perusahaan.create({
            data: {
                nama: nama,
                alamat: alamat,
                no_telp: no_telp,
                kode: kode
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        });

        return createdPerusahaan;
    }

    async updatePerusahaan(id: string, nama: string, alamat: string, no_telp: string, kode: string) {
        const updatedPerusahaan = await Perusahaan.update({
            where: {
                id: id
            },
            data: {
                nama: nama,
                alamat: alamat,
                no_telp: no_telp,
                kode: kode
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        });

        return updatedPerusahaan;
    }

    async deletePerusahaan(id: string) {
        const deletedPerusahaan = await Perusahaan.delete({
            where: {
                id: id,
            },
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            }
        });

        return deletedPerusahaan;
    }   
}

export default new PerusahaanService();