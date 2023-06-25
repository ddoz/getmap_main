-- CreateTable
CREATE TABLE `bagians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` INTEGER NOT NULL,
    `unitId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bankName` VARCHAR(191) NOT NULL,
    `bankAccount` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fiscalYears` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `Status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `budgetMaster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `groupInOut` VARCHAR(191) NOT NULL,
    `unitId` INTEGER NOT NULL,
    `budgetCode` VARCHAR(191) NOT NULL,
    `description` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subMasterBudget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fiscalYearId` INTEGER NOT NULL,
    `budgetMasterId` INTEGER NOT NULL,
    `budgetSubCode` VARCHAR(191) NOT NULL,
    `subDescription` VARCHAR(200) NOT NULL,
    `jan` INTEGER NOT NULL,
    `feb` INTEGER NOT NULL,
    `mar` INTEGER NOT NULL,
    `apr` INTEGER NOT NULL,
    `may` INTEGER NOT NULL,
    `jun` INTEGER NOT NULL,
    `jul` INTEGER NOT NULL,
    `aug` INTEGER NOT NULL,
    `sep` INTEGER NOT NULL,
    `oct` INTEGER NOT NULL,
    `nov` INTEGER NOT NULL,
    `dec` INTEGER NOT NULL,
    `total` BIGINT NOT NULL,
    `budgetType` ENUM('D', 'K') NOT NULL,
    `budgetDescription` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bagians` ADD CONSTRAINT `bagians_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `budgetMaster` ADD CONSTRAINT `budgetMaster_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subMasterBudget` ADD CONSTRAINT `subMasterBudget_fiscalYearId_fkey` FOREIGN KEY (`fiscalYearId`) REFERENCES `fiscalYears`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subMasterBudget` ADD CONSTRAINT `subMasterBudget_budgetMasterId_fkey` FOREIGN KEY (`budgetMasterId`) REFERENCES `budgetMaster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
