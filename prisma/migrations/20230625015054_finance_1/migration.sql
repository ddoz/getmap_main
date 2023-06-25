/*
  Warnings:

  - You are about to drop the column `Status` on the `fiscalYears` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fiscalYears` DROP COLUMN `Status`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
