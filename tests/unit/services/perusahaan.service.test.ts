import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpStatusCode } from "../../../src/common/types";
import { Perusahaan } from "../../../src/models";
import { PerusahaanService } from "../../../src/services";
import { HttpError } from "../../../src/utils";

jest.mock("../../../src/models");
const mockedPerusahaanFindMany = Perusahaan.findMany as jest.MockedFunction<typeof Perusahaan.findMany>;
const mockedPerusahaanFindFirst = Perusahaan.findFirst as jest.MockedFunction<typeof Perusahaan.findFirst>;
const mockedPerusahaanCreate = Perusahaan.create as jest.MockedFunction<typeof Perusahaan.create>;
const mockedPerusahaanUpdate = Perusahaan.update as jest.MockedFunction<typeof Perusahaan.update>;
const mockedPerusahaanDelete = Perusahaan.delete as jest.MockedFunction<typeof Perusahaan.delete>;

const mockPerusahaanList = [
    {
        "id": "clk75yk1k0004wh1in65b2rgz",
        "nama": "Erdman and Sons",
        "alamat": "4450 Joel Place",
        "no_telp": "797-761-9405 x19749",
        "kode": "XUN",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk130000wh1is61o2csx",
        "nama": "Heidenreich, Kshlerin and Cartwright",
        "alamat": "290 Darren Village",
        "no_telp": "(346) 870-6138",
        "kode": "LYU",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1n0005wh1iayhygzlb",
        "nama": "Kris, Parisian and Marks",
        "alamat": "14450 Powlowski Summit",
        "no_telp": "1-914-717-2297 x09250",
        "kode": "SOQ",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1k0003wh1ieisu39oh",
        "nama": "Terry, Feil and Crooks",
        "alamat": "612 Tamara Cove",
        "no_telp": "(912) 943-4436 x4281",
        "kode": "GWA",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1o0006wh1ig8zhhl6t",
        "nama": "Trantow, Baumbach and Schaefer",
        "alamat": "1470 Milo Court",
        "no_telp": "(382) 599-4827 x065",
        "kode": "QIQ",
        created_at: new Date(),
        updated_at: new Date(),
    }
]

describe('Perusahaan Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('getAllPerusahaan', () => {
    it('should return all perusahaan with selected attributes ordered by name in ascending order', async () => {
        mockedPerusahaanFindMany.mockResolvedValue(mockPerusahaanList);
        
        const result = await PerusahaanService.getAllPerusahaan();
    
        expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
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
        
        expect(result).toEqual(mockPerusahaanList);
      });
  });

  describe('filterPerusahaan', () => {
    it('should return all perusahaan with selected attributes ordered by name in ascending order when provided with undefined query', async () => {
        mockedPerusahaanFindMany.mockResolvedValue(mockPerusahaanList);
        
        const result = await PerusahaanService.filterPerusahaan();
    
        expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: "",
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
        });
        
        expect(result).toEqual(mockPerusahaanList);
      });

    it('should return filtered perusahaan by name with selected attributes ordered by name in ascending order when provided with name query', async () => {
        const query = 'erdman';
        const _mockPerusahaanList = [
            {
                "id": "clk75yk1k0004wh1in65b2rgz",
                "nama": "Erdman and Sons",
                "alamat": "4450 Joel Place",
                "no_telp": "797-761-9405 x19749",
                "kode": "XUN",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        mockedPerusahaanFindMany.mockResolvedValue(_mockPerusahaanList);
        
        const result = await PerusahaanService.filterPerusahaan(query);
    
        expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: query,
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
        });
        
        expect(result).toEqual(_mockPerusahaanList);
      });
    
    it('should return filtered Perusahaan by kode with selected attributes ordered by name in ascending order when provided with kode query', async () => {
        const query = 'xun';
        const _mockPerusahaanList = [
            {
                "id": "clk75yk1k0004wh1in65b2rgz",
                "nama": "Erdman and Sons",
                "alamat": "4450 Joel Place",
                "no_telp": "797-761-9405 x19749",
                "kode": "XUN",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        mockedPerusahaanFindMany.mockResolvedValue(_mockPerusahaanList);
        
        const result = await PerusahaanService.filterPerusahaan(query);
    
        expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
            where: {
                OR: [
                    {
                        nama: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: query,
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
        });
        
        expect(result).toEqual(_mockPerusahaanList);
      });
  });

  describe('getPerusahaanById', () => {
    it('should return perusahaan if found', async () => {
        const id = 'clk75yk1k0004wh1in65b2rgz';
        const mockPerusahaan =  {
            "id": "clk75yk1k0004wh1in65b2rgz",
            "nama": "Erdman and Sons",
            "alamat": "4450 Joel Place",
            "no_telp": "797-761-9405 x19749",
            "kode": "XUN",
            created_at: new Date(),
            updated_at: new Date(),
        };

        mockedPerusahaanFindFirst.mockResolvedValue(mockPerusahaan);

        const result = await PerusahaanService.getPerusahaanById(id);

        expect(mockedPerusahaanFindFirst).toHaveBeenCalledWith({
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

        expect(result).toEqual(mockPerusahaan);
    });

    it('should throw an error when ID does not exist', async () => {
        const id = 'unknownid';

        mockedPerusahaanFindFirst.mockResolvedValue(null);

        await expect(PerusahaanService.getPerusahaanById(id)).rejects.toThrow(
            new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found')
          );
      
        expect(mockedPerusahaanFindFirst).toHaveBeenCalledWith({
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
    });
  });

  describe('createPerusahaan', () => {
    it('should create a new Perusahaan when all inputs are valid', async () => {
        const nama = 'Perusahaan 1';
        const alamat = 'Address 1';
        const no_telp = '123456789';
        const kode = 'ABC';
    
        const mockCreatedPerusahaan = {
			id: "Perusahaan_id",
			nama: nama,
            alamat: alamat,
            no_telp: no_telp,
            kode: 'ABC',
            created_at: new Date(),
            updated_at: new Date(),
		}
    
        mockedPerusahaanCreate.mockResolvedValue(mockCreatedPerusahaan);
    
        const result = await PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode);
    
        expect(mockedPerusahaanCreate).toHaveBeenCalledTimes(1);
        expect(mockedPerusahaanCreate).toHaveBeenCalledWith({
        data: {
            nama: nama,
            alamat: alamat,
            no_telp: no_telp,
            kode: kode,
        },
        select: {
            id: true,
            nama: true,
            alamat: true,
            no_telp: true,
            kode: true,
        },
        });
    
        expect(result).toEqual(mockCreatedPerusahaan);
      });
    
    it('should throw an error when the kode is invalid', async () => {
        const nama = 'Perusahaan 1';
        const alamat = 'Address 1';
        const no_telp = '123456789';
        const kode = 'abc';
    
        await expect(PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null)
        );
        
        expect(mockedPerusahaanCreate).not.toHaveBeenCalled();
      });
  });

  describe('updatePerusahaan', () => {
    it('should update the Perusahaan when all inputs are valid', async () => {
        const id = "Perusahaan_id";
        const nama = 'Perusahaan 2';
        const alamat = 'Address 2';
        const no_telp = '123456789';
        const kode = 'ABC';
    
        const mockUpdatedPerusahaan = {
			id: id,
			nama: nama,
            alamat: alamat,
            no_telp: no_telp,
            kode: 'ABC',
            created_at: new Date(),
            updated_at: new Date(),
		}
        
        mockedPerusahaanUpdate.mockResolvedValue(mockUpdatedPerusahaan);
    
        const result = await PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);
    
        expect(mockedPerusahaanUpdate).toHaveBeenCalledTimes(1);
        expect(mockedPerusahaanUpdate).toHaveBeenCalledWith({
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
    
        expect(result).toEqual(mockUpdatedPerusahaan);
      });
    
    it('should throw an error when the kode is invalid', async () => {
        const id = "Perusahaan_id";
        const nama = 'Perusahaan 2';
        const alamat = 'Address 2';
        const no_telp = '123456789';
        const kode = 'AS3';
    
        await expect(PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null)
        );
        
        expect(mockedPerusahaanUpdate).not.toHaveBeenCalled();
      });
    
    it('should throw an error when ID does not exist', async () => {
        const id = 'non_existing_id';
        const nama = 'Unknown Perusahaan';
        const alamat = 'Address 2';
        const no_telp = '123456789';
        const kode = 'ABC';
        
        mockedPerusahaanUpdate.mockImplementation(() => {
            throw new PrismaClientKnownRequestError('Perusahaan not found', {clientVersion: 'v1.0', code: '400'});
        })
    
        await expect(PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null)
        );
    
        expect(mockedPerusahaanUpdate).toHaveBeenCalledTimes(1);
        expect(mockedPerusahaanUpdate).toHaveBeenCalledWith({
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
      });
  });

  describe('deletePerusahaan', () => {
    it('should delete the Perusahaan when ID exists', async () => {
        const id = 'existing_id';
    
        const mockDeletedPerusahaan = {
            "id": "existing_id",
            "nama": "Erdman and Sons",
            "alamat": "4450 Joel Place",
            "no_telp": "797-761-9405 x19749",
            "kode": "XUN",
            created_at: new Date(),
            updated_at: new Date(),
        };
    
        mockedPerusahaanDelete.mockResolvedValue(mockDeletedPerusahaan);
    
        const result = await PerusahaanService.deletePerusahaan(id);
    
        expect(mockedPerusahaanDelete).toHaveBeenCalledTimes(1);
        expect(mockedPerusahaanDelete).toHaveBeenCalledWith({
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
    
        expect(result).toEqual(mockDeletedPerusahaan);
      });
    
      it('should throw an error when ID does not exist', async () => {
        const id = 'non_existing_id';
    
        mockedPerusahaanDelete.mockImplementation(() => {
            throw new PrismaClientKnownRequestError('Perusahaan not found', {clientVersion: 'v1.0', code: '400'});
        })
    
        await expect(PerusahaanService.deletePerusahaan(id)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null)
        );
    
        expect(mockedPerusahaanDelete).toHaveBeenCalledTimes(1);
        expect(mockedPerusahaanDelete).toHaveBeenCalledWith({
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
      });
  });
});
