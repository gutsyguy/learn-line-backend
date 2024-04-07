import express from 'express';
import { Pool } from "pg";
import { Database } from "./api/database";
import dotenv from 'dotenv';
import { DesiredDifficulty } from '@prisma/client';

dotenv.config();
const app = express()
const userDb = new Database()

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

const student:StudentInfo = {
  id: 1,
  name: "Yalamber",
  careerDecided: true,
  careerPlan: "Software Engineer",
  careerGoals: [""],
  classes: [],
  advancedClassCap: 6,
  totalClassCap: 6,
  desiredDifficulty: "B" 
}

app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

const getPostgresVersion = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT version()");
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
};

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: any) => {
  getPostgresVersion();
  res.send("Hello Bird");
});


app.get("/api/getStudent", (req, res) =>{
  userDb.getAllStudents()
})

app.post("/api/createStudent", (req, res) => {
  // {name, careerDecided, careerPlan, careerGoals, classes, advancedClassCap, totalClassCap, desiredDifficulty} = req.body
  const studente = req.body

  userDb
    .createStudent(studente)
    .then(() => {
      res.status(201).send("User created");
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).send("Error creating user: " + error.message);
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
