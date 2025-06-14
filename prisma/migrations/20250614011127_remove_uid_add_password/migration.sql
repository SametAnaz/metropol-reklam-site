/*
  Warnings:

  - You are about to drop the column `uid` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_uid_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `uid`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
