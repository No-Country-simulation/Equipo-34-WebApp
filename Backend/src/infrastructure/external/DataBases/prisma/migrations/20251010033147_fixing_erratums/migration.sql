/*
  Warnings:

  - You are about to drop the column `correo` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatep_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "correo",
DROP COLUMN "updatep_at",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
