/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `deviceInfo` TEXT NULL,
    ADD COLUMN `ipAddress` VARCHAR(191) NULL,
    ADD COLUMN `location` TEXT NULL,
    ADD COLUMN `userAgent` TEXT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;
