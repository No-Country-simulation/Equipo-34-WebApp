/*
  Warnings:

  - You are about to drop the column `first_name` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `emergency_contact` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `national_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Patient_national_id_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "date_of_birth",
DROP COLUMN "emergency_contact",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "national_id",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_hash",
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "emergency_contact" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "national_id" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;
