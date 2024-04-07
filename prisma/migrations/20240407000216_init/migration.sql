/*
  Warnings:

  - Changed the type of `classType` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `classCategory` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gradeOffered` on the `Class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "classType",
ADD COLUMN     "classType" TEXT NOT NULL,
DROP COLUMN "classCategory",
ADD COLUMN     "classCategory" TEXT NOT NULL,
DROP COLUMN "gradeOffered",
ADD COLUMN     "gradeOffered" INTEGER NOT NULL;
