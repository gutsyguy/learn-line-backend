/*
  Warnings:

  - You are about to drop the column `classesOffered` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `classesTaken` on the `Student` table. All the data in the column will be lost.
  - Added the required column `gradeOffered` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offered` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taken` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GradeOffered" AS ENUM ('A', 'B', 'C', 'D');

-- DropIndex
DROP INDEX "Student_id_key";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "gradeOffered" "GradeOffered" NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "offered" BOOLEAN NOT NULL,
ADD COLUMN     "taken" BOOLEAN NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "classesOffered",
DROP COLUMN "classesTaken",
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_ClassToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToStudent_AB_unique" ON "_ClassToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToStudent_B_index" ON "_ClassToStudent"("B");

-- AddForeignKey
ALTER TABLE "_ClassToStudent" ADD CONSTRAINT "_ClassToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToStudent" ADD CONSTRAINT "_ClassToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
