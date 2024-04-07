import { ClassCategory, ClassType, DesiredDifficulty, GradeOffered, Student } from "@prisma/client";
import { ClassInfo, StudentInfo } from "../lib/Interfaces";

const {PrismaClient} = require("@prisma/client")

require("dotenv").config()

const prisma = new PrismaClient();

const letterToGrade = (letter:String) =>{
  switch (letter){
    case "A": 
      return 9
      break;
    case "B":
      return 10
    case "C":
      return 11
    case "D":
      return 12
    default:
      return 9
  }
}

const fillerClasses:ClassInfo[] = [{
  className: "AP Physics C:Mechanics",
  offered: true,
  taken: true,
  gradeOffered: letterToGrade(GradeOffered.C),
  classType: ClassType.ap,
  classCategory: ClassCategory.C,
  classDifficulty: 10,  
  students: [] 
},
{
  className: "AP Chemistry",
  offered: true,
  taken: true,
  gradeOffered: letterToGrade(GradeOffered.C),
  classType: ClassType.ap,
  classCategory: ClassCategory.D,
  classDifficulty: 10,  
  students: [] 
}]

export class Database {

  async createStudent(student: StudentInfo) {
    const createdStudent = await prisma.student.create({
      data: {
        name: student.name,
        careerDecided: student.careerDecided,
        careerPlan: student.careerPlan,
        careerGoals: student.careerGoals, // Assuming careerGoals is an array of strings
        classes: fillerClasses, // Assuming that classes is a relation and you have set up the Prisma schema to handle nested writes
        advancedClassCap: student.advancedClassCap,
        totalClassCap: student.totalClassCap,
        desiredDifficulty: student.desiredDifficulty,
      },
    });
    return createdStudent;
  }

  async createClass(classInfo: ClassInfo) {
    // You need to make sure that the classType and classCategory 
    // match the enum values from your Prisma schema
    const createdClass = await prisma.class.create({
      data: {
        className: classInfo.className,
        offered: classInfo.offered,
        taken: classInfo.taken,
        gradeOffered: classInfo.gradeOffered,
        classType: ClassType[classInfo.classType as keyof typeof ClassType], 
        classCategory: ClassCategory[classInfo.classCategory as keyof typeof ClassCategory],
        classDifficulty: classInfo.classDifficulty,
        // Omit the students field if you are not connecting students at creation time
      },
    });
    return createdClass;
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
  

  async getAllStudents(){
    const students = await prisma.student.findMany()
    console.log(students)
  }

  async checkStudent(name: string){
    const user = await prisma.student.findFirst({
      where:{
        name: name
      }
    })
    return user
  }

  async updateClass(name:string, classes:ClassInfo[]){
    await prisma.student.update({
      where:{
        name: name
      },
      data: {
        classes: classes
      }
    })
  } 

}

async function ReadUsers(){
  const allUsers = await prisma.student.findMany()
  console.log(allUsers)
}

ReadUsers().then(async() =>{
  await prisma.$disconnect()
}).catch(async(e:any) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



