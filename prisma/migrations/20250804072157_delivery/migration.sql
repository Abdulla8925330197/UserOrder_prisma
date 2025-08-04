/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `password` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `passwordHash`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
