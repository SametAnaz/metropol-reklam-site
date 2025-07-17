/*
  Warnings:

  - You are about to drop the column `imageData` on the `gallery` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `gallery` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `imageData`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `mimeType`,
    ADD COLUMN `blobUrl` TEXT NULL;
