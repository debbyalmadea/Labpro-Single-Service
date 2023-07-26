import { PerusahaanService } from ".";
import { HttpStatusCode } from "../common/types";
import { Barang } from "../models";
import { HttpError } from "../utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class BarangService {
    async getAllBarang() {
        return await Barang.findMany({
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
        const barangList = await Barang.findMany({
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
        const barang = await Barang.findFirst({
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
        const kodeRegex = /\b[A-Z]{3}\b/
        if (!kodeRegex.test(kode)) {
            throw new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
        }
        
        const perusahaan = await PerusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        const createdBarang = await Barang.create({
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
    }

    async updateBarang(id: string, nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) {
        const kodeRegex = /\b[A-Z]{3}\b/
        if (!kodeRegex.test(kode)) {
            throw new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
        }

        const perusahaan = await PerusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        try {
            const updatedBarang = await Barang.update({
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
                throw new HttpError(HttpStatusCode.BadRequest, 'Barang not found');
            }
        }
    }

    async deleteBarang(id: string) {
        try {
            const deletedBarang = await Barang.delete({
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
        }
    }   

    async decreaseStokBarang(id: string, stok: number) {
        try {
            const updatedBarang = await Barang.update({
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
        }
    }
}

export default new BarangService();