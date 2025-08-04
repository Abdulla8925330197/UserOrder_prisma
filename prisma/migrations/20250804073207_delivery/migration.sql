/*
  Warnings:

  - You are about to drop the column `password` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `password`,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;
