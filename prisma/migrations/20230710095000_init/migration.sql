/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_perusahaan_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_perusahaan_id_fkey" FOREIGN KEY ("perusahaan_id") REFERENCES "Perusahaan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
