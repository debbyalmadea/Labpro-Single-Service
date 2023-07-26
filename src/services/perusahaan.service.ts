import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpStatusCode, IPerusahaanService, PerusahaanModel } from "../common/types";
import { HttpError } from "../utils";

class PerusahaanService implements IPerusahaanService {
    private perusahaanModel: PerusahaanModel;

    constructor(perusahaanModel: PerusahaanModel) {
        this.perusahaanModel = perusahaanModel;
    }

    async getAllPerusahaan() {
        return await this.perusahaanModel.findMany({
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
        const perusahaanList = await this.perusahaanModel.findMany({
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
        const perusahaan = await this.perusahaanModel.findFirst({
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

        const createdPerusahaan = await this.perusahaanModel.create({
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
            const updatedPerusahaan = await this.perusahaanModel.update({
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

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }

    async deletePerusahaan(id: string) {
        try {
            const deletedPerusahaan = await this.perusahaanModel.delete({
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

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }   
}

export default PerusahaanService;