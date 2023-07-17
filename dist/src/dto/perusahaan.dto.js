"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerusahaanSchema = exports.updatePerusahaanSchema = exports.createPerusahaanSchema = exports.getPerusahaanByIdSchema = void 0;
const zod_1 = require("zod");
const getPerusahaanByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    })
});
exports.getPerusahaanByIdSchema = getPerusahaanByIdSchema;
const createPerusahaanSchema = zod_1.z.object({
    body: zod_1.z.object({
        nama: zod_1.z.string({
            required_error: "Nama is required",
        }),
        alamat: zod_1.z.string({
            required_error: "Alamat is required",
        }),
        no_telp: zod_1.z.string({
            required_error: "No Telp is required",
        }),
        kode: zod_1.z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, { message: "Kode must be 3 uppercase letter" })
    })
});
exports.createPerusahaanSchema = createPerusahaanSchema;
const updatePerusahaanSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: zod_1.z.object({
        nama: zod_1.z.string({
            required_error: "Nama is required",
        }),
        alamat: zod_1.z.string({
            required_error: "Alamat is required",
        }),
        no_telp: zod_1.z.string({
            required_error: "No Telp is required",
        }),
        kode: zod_1.z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, { message: "Kode must be 3 uppercase letter" })
    })
});
exports.updatePerusahaanSchema = updatePerusahaanSchema;
const deletePerusahaanSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Params Id is required",
        }),
    })
});
exports.deletePerusahaanSchema = deletePerusahaanSchema;
