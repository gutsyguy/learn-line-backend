import { DesiredDifficulty, Student } from "@prisma/client";

const {PrismaClient} = require("@prisma/client")

require("dotenv").config()

const prisma = new PrismaClient();

enum ClassType{
  regular,
  honor,
  ap,
  dualEnrollment,
  ib,
}

enum ClassCategory{
  A,
  B,
  C,
  D,
  E,
  F,
  G
}

enum GradeOffered{
  A = 9,
  B = 10,
  C = 11,
  D = 12
}

enum IntendedDifficulty{
  A,
  B,
  C,
  D, 
}

const fillerClasses:ClassInfo[] = [{
  className: "AP Physics C:Mechanics",
  offered: true,
  taken: true,
  gradeOffered: GradeOffered.C,
  classType: ClassType.ap,
  classCategory: ClassCategory.D,
  classDifficulty: 10,  
  students: [] 
},
{
  className: "AP Chemistry",
  offered: true,
  taken: true,
  gradeOffered: GradeOffered.C,
  classType: ClassType.ap,
  classCategory: ClassCategory.D,
  classDifficulty: 10,  
  students: [] 
}]


interface ClassInfo {
  className: string,
  offered: boolean,
  taken: boolean,
  gradeOffered: number,
  classType: ClassType
  classCategory: ClassCategory
  classDifficulty: number,
  students: StudentInfo[]
}

export interface StudentInfo{
  id:number,
  name:string,
  careerDecided: boolean,
  careerPlan: string,
  careerGoals: string[],
  classes: ClassInfo[],
  advancedClassCap: number,
  totalClassCap: number,
  desiredDifficulty: DesiredDifficulty
}



// export class Database {
//   async createStudent(
//     /* name:string,
//     careerDecided: boolean,
//     careerPlan: string | null,
//     careerGoals: string[] | null,
//     classes: ClassInfo[],
//     advancedClassCap: number,
//     totalClassCap: number,
//     desiredDifficulty: number
//     */
//     student:StudentInfo
//   ){
//     await prisma.student.create({
//       id: 1, //@todo make this a unique value
//       name: student.name,
//       careeerDecided: student.careerDecided,
//       careerPlan: student.careerPlan, 
//       careerGoals: student.careerGoals,
//       classes: fillerClasses,
//       advancedClassCap: student.advancedClassCap,
//       totalClassCap: student.totalClassCap,
//       desiredDifficulty: student.desiredDifficulty 
//     })
//   }
// }

export class Database {


  async createStudent(student:StudentInfo) {
    const createdStudent = await prisma.student.create({
      data: {
        name: student.name,
        careerDecided: student.careerDecided,
        careerPlan: student.careerPlan,
        careerGoals:  student.careerGoals , // Assuming careerGoals is an array
        advancedClassCap: student.advancedClassCap,
        totalClassCap: student.totalClassCap,
        desiredDifficulty: "B",
        // Add other fields as necessary according to your Prisma schema
      },
    });
    return createdStudent;
  }

  async getAllStudents(){
    const students = await prisma.student.findMany()
    return students
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



