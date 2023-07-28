import { BarangModel, HttpStatusCode, IBarangService, IPerusahaanService } from "../common/types";
import { HttpError } from "../utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class BarangService implements IBarangService {
    private barangModel: BarangModel;
    private perusahaanService: IPerusahaanService;

    constructor(barangModel: BarangModel, perusahaanService: IPerusahaanService) {
        this.barangModel = barangModel;
        this.perusahaanService = perusahaanService;
    }

    async getAllBarang() {
        return await this.barangModel.findMany({
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        });
    }

    async filterBarang(q?: string, perusahaan_id?: string) {
        const barangList = await this.barangModel.findMany({
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
                ],
                perusahaan_id: {
                    contains: perusahaan_id ?? "",
                }
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            },
            orderBy: [
                {
                    nama: 'asc'
                }
            ]
        })

        return barangList;
    }
    
    async getBarangById(id: string) {
        const barang = await this.barangModel.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nama: true,
                harga: true, 
                stok: true,
                perusahaan_id: true,
                kode: true
            }
        });

        if (!barang) {
            throw new HttpError(HttpStatusCode.NotFound, "Barang not found")
        }

        return barang;
    }


    async createBarang(nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) {
        const perusahaan = await this.perusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        try {
            const createdBarang = await this.barangModel.create({
                data: {
                    nama: nama,
                    harga: harga,
                    stok: stok,
                    perusahaan_id: perusahaan_id,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true, 
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
    
            return createdBarang;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpError(HttpStatusCode.BadRequest, 'Kode must be unique');
            }

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }

    async updateBarang(id: string, nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) {
        const perusahaan = await this.perusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        try {
            const updatedBarang = await this.barangModel.update({
                where: {
                    id: id
                },
                data: {
                    nama: nama,
                    harga: harga,
                    stok: stok,
                    perusahaan_id: perusahaan_id,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true, 
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
    
            return updatedBarang;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                let message = 'Barang not found';
                if (error.message.includes('Unique constraint')) {
                    message = 'Kode must be unique'
                }
                throw new HttpError(HttpStatusCode.BadRequest, message);
            }

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }

    async deleteBarang(id: string) {
        try {
            const deletedBarang = await this.barangModel.delete({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true, 
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });

            return deletedBarang;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpError(HttpStatusCode.BadRequest, 'Barang not found');
            }

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }   

    async decreaseStokBarang(id: string, stok: number) {
        try {
            const updatedBarang = await this.barangModel.update({
                where: {
                    id: id
                },
                data: {
                    stok: {
                        decrement: stok
                    }
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true, 
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
    
            return updatedBarang;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new HttpError(HttpStatusCode.BadRequest, 'Barang not found');
            }

            throw new HttpError(HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
        }
    }
}

export default BarangService;