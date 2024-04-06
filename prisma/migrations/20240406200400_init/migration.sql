-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('regular', 'honor', 'ap', 'dualEnrollment', 'ib');

-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G');

-- CreateEnum
CREATE TYPE "DesiredDifficulty" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateTable
CREATE TABLE "Class" (
    "className" TEXT NOT NULL,
    "classType" "ClassType" NOT NULL,
    "classCategory" "ClassCategory" NOT NULL,
    "classDifficulty" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "careerDecide" BOOLEAN NOT NULL,
    "careerPlan" TEXT NOT NULL,
    "careerGoals" TEXT[],
    "classesTaken" TEXT[],
    "classesOffered" TEXT[],
    "advancedClassCap" INTEGER NOT NULL,
    "totalClassCap" INTEGER NOT NULL,
    "desiredDifficulty" "DesiredDifficulty" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_className_key" ON "Class"("className");

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
