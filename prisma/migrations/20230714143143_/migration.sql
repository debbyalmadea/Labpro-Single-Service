/*
  Warnings:

  - You are about to alter the column `harga` on the `Barang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Barang" ALTER COLUMN "harga" SET DATA TYPE INTEGER;
