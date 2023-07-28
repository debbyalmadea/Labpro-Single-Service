/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Barang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barang_kode_key" ON "Barang"("kode");
