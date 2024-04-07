"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const client_1 = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const prisma = new PrismaClient();
const letterToGrade = (letter) => {
    switch (letter) {
        case "A":
            return 9;
            break;
        case "B":
            return 10;
        case "C":
            return 11;
        case "D":
            return 12;
        default:
            return 9;
    }
};
const fillerClasses = [{
        id: 1,
        className: "AP Physics C:Mechanics",
        offered: true,
        taken: true,
        gradeOffered: letterToGrade(client_1.GradeOffered.C),
        classType: client_1.ClassType.ap,
        classCategory: client_1.ClassCategory.C,
        classDifficulty: 10,
        students: []
    },
    {
        id: 2,
        className: "AP Chemistry",
        offered: true,
        taken: true,
        gradeOffered: letterToGrade(client_1.GradeOffered.C),
        classType: client_1.ClassType.ap,
        classCategory: client_1.ClassCategory.D,
        classDifficulty: 10,
        students: []
    }];
class Database {
    async createStudent(student) {
        const createdStudent = await prisma.student.create({
            data: {
                name: student.name,
                careerDecided: student.careerDecided,
                careerPlan: student.careerPlan,
                careerGoals: student.careerGoals, // Assuming careerGoals is an array of strings
                advancedClassCap: 4,
                totalClassCap: student.totalClassCap,
                desiredDifficulty: student.desiredDifficulty,
            },
        });
        return createdStudent;
    }
    async createClass(classInfo) {
        // You need to make sure that the classType and classCategory 
        // match the enum values from your Prisma schema
        const createdClass = await prisma.class.create({
            data: {
                className: classInfo.className,
                offered: classInfo.offered,
                taken: classInfo.taken,
                gradeOffered: classInfo.gradeOffered,
                classType: client_1.ClassType[classInfo.classType],
                classCategory: client_1.ClassCategory[classInfo.classCategory],
                classDifficulty: classInfo.classDifficulty,
                // Omit the students field if you are not connecting students at creation time
            },
        });
        return createdClass;
    }
    async updateStudent(name, classes) {
        await prisma.student.update({
            where: {
                name: name
            },
            data: {
                classes: classes
            }
        });
    }
    // async createClass(classInfo: ClassInfo) {
    //   // Ensure `classInfo.classType` and `classInfo.classCategory` are of type `string`
    //   // and that they match the actual values expected by the schema.
    //   const createdClass = await prisma.class.create({
    //     // data: {
    //     //   className: classInfo.className,
    //     //   offered: classInfo.offered,
    //     //   taken: classInfo.taken,
    //     //   gradeOffered: classInfo.gradeOffered,
    //     //   classType: classInfo.classType, // Convert the enum to its string representation
    //     //   classCategory: classInfo.classCategory, // Same as above for `class
    //     //   classDifficulty: classInfo.classDifficulty,
    //     //   // Assuming that students is a relational field, handle according to Prisma's documentation.
    //     // },
    //     data: {
    //       className: fillerClasses[0].className,
    //       offered: fillerClasses[0].offered,
    //       taken: fillerClasses[0].taken,
    //       gradeOffered: fillerClasses[0].gradeOffered,
    //       classType: fillerClasses[0].classType, // Convert the enum to its string representation
    //       classCategory: fillerClasses[0].classCategory, // Same as above for `class
    //       classDifficulty: fillerClasses[0].classDifficulty,
    //       // Assuming that students is a relational field, handle according to Prisma's documentation.
    //     },
    //   });
    //   return createdClass;
    // }
    async getAllStudents() {
        const students = await prisma.student.findMany();
        console.log(students);
    }
    async checkStudent(name) {
        const user = await prisma.student.findFirst({
            where: {
                name: name
            }
        });
        return user;
    }
    async addClass(studentId, classIds) {
        await prisma.student.update({
            where: {
                id: studentId, // Identify the student by their ID
            },
            data: {
                classes: {
                    connect: classIds.map(id => ({ id })) // Connect classes by their IDs
                }
            }
        });
    }
    async updateClass(name, classes) {
        await prisma.student.update({
            where: {
                name: name
            },
            data: {
                classes: {
                    updateMany: {
                        data: classes,
                    }
                }
            }
        });
    }
}
exports.Database = Database;
async function ReadUsers() {
    const allUsers = await prisma.student.findMany();
    console.log(allUsers);
}
ReadUsers().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
