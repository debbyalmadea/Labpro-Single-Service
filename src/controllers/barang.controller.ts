import { Request, Response } from "express";
import { BarangService } from "../services";

class BarangController {
    async getAllBarang(req: Request, res: Response) {
        const { q, perusahaan } = req.query;

        const barangList = await BarangService.searchBarang(
            typeof q === 'string' ? q : "", 
            typeof perusahaan === 'string' ? perusahaan : ""
        );

        return res.status(200).json({
            status: 'success',
            message: "Successfully retrieved data",
            data: barangList
        })
    }

    async getBarangById(req: Request, res: Response) {
        const { id } = req.params;

        const barang = await BarangService.getBarangById(id);

        if (!barang) {
            return res.status(404).json({
                status: 'error',
                message: "Barang not found",
                data: null
            })
        }

        return res.status(200).json({
            status: 'success',
            message: "Successfully retrieved data",
            data: barang
        })
    }

    async createBarang(req: Request, res: Response) {
        const { nama, harga, stok, perusahaan_id, kode } = req.body;
        const barang = await BarangService.createBarang(nama, harga, stok, perusahaan_id, kode);

        return res.status(200).json({
            status: 'success',
            message: "Successfully created Barang",
            data: barang
        })
    }

    async updateBarang(req: Request, res: Response) {
        const { nama, harga, stok, perusahaan_id, kode } = req.body;
        const { id } = req.params
        const barang = await BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode);

        return res.status(200).json({
            status: 'success',
            message: "Successfully updated Barang",
            data: barang
        })
    }

    async deleteBarang(req: Request, res: Response) {
        const { id } = req.params

        const barang = await BarangService.deleteBarang(id);

        return res.status(200).json({
            status: 'success',
            message: "Successfully deleted Barang",
            data: barang
        })
    }

    async updateStokBarang(req: Request, res: Response) {
        const { id } = req.params
        const { stok_baru } = req.body

        const barang = await BarangService.updateStokBarang(id, stok_baru);

        return res.status(200).json({
            status: 'success',
            message: "Successfully updated stok",
            data: barang
        })
    }
}

export default new BarangController();