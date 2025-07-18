-- Add title and bio fields to User model
ALTER TABLE `users` ADD COLUMN `title` VARCHAR(191) NULL;
ALTER TABLE `users` ADD COLUMN `bio` TEXT NULL;
