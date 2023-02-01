-- DropForeignKey
ALTER TABLE `usersareas` DROP FOREIGN KEY `UsersAreas_areaId_fkey`;

-- DropForeignKey
ALTER TABLE `usersareas` DROP FOREIGN KEY `UsersAreas_userId_fkey`;

-- CreateTable
CREATE TABLE `checklistsquestions` (
    `questionId` INTEGER NOT NULL,
    `checklistId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`questionId`, `checklistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checklistsquestions` ADD CONSTRAINT `checklistsquestions_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklistsquestions` ADD CONSTRAINT `checklistsquestions_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `checklists`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersareas` ADD CONSTRAINT `usersareas_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersareas` ADD CONSTRAINT `usersareas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
