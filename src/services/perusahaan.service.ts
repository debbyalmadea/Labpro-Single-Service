import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpStatusCode } from "../common/types";
import { Perusahaan } from "../models";
import { HttpError } from "../utils";

class PerusahaanService {
    async getAllPerusahaan() {
        return await Perusahaan.findMany({
            select: {
                id: true,
                nama: true,
                alamat: true,
                no_telp: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
    }

    async filterPerusahaan(q?: string) {
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
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
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

        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, "Perusahaan not found")
        }

        return perusahaan;
    }

    async createPerusahaan(nama: string, alamat: string, no_telp: string, kode: string) {
        const kodeRegex = /\b[A-Z]{3}\b/
        if (!kodeRegex.test(kode)) {
            throw new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
        }

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
        const kodeRegex = /\b[A-Z]{3}\b/
        if (!kodeRegex.test(kode)) {
            throw new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
        }

        try {
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
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpError(HttpStatusCode.BadRequest, 'Perusahaan not found');
            }
        }
    }

    async deletePerusahaan(id: string) {
        try {
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
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpError(HttpStatusCode.BadRequest, 'Perusahaan not found');
            }
        }
    }   
}

export default new PerusahaanService();