
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

enum IntendedDifficulty{
  A,
  B,
  C,
  D, 
}


interface ClassInfo {
  className: string,
  offered: boolean,
  taken: boolean,
  gradeOffered: number,
  classType: ClassType
  classCategory: ClassCategory
  classDifficulty: number,
  Students: Student[]
}

interface Student{
  id:number,
  name:string,
  careerDecided: boolean,
  careerPlan: string,
  careerGoals: string[],
  classes: ClassInfo[],
  advancedClassCap: number,
  totalClassCap: number,
  desiredDifficulty: number
}

export class Database {
  async createStudent(
    /* name:string,
    careerDecided: boolean,
    careerPlan: string | null,
    careerGoals: string[] | null,
    classes: ClassInfo[],
    advancedClassCap: number,
    totalClassCap: number,
    desiredDifficulty: number
    */
    student:Student
  ){
    await prisma.student.create({
      name: student.name,
      careeerDecided: student.careerDecided,
      careerPlan: student.careerPlan, 
      careerGoals: student.careerGoals,
      classes: student.classes,
      advancedClassCap: student.advancedClassCap,
      totalClassCap: student.totalClassCap,
      desiredDifficulty: student.desiredDifficulty 
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



