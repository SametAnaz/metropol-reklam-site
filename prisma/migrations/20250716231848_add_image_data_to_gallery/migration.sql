-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `imageData` LONGBLOB NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NULL;
