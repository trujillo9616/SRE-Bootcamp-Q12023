-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(10) NOT NULL,
    `password` VARCHAR(255) NULL,
    `salt` VARCHAR(50) NULL,
    `role` VARCHAR(10) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

