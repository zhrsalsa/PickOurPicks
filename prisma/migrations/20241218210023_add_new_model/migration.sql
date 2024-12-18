/*
  Warnings:

  - You are about to drop the column `sinopsis` on the `Drama` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "sinopsis",
ALTER COLUMN "episode" DROP NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL,
ALTER COLUMN "platform" DROP NOT NULL,
ALTER COLUMN "poster" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "trope" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL;
