import express from 'express';
import cors from 'cors'
import { Pool } from "pg";
import { Database } from "./api/database";
import dotenv from 'dotenv';
import { DesiredDifficulty } from '@prisma/client';
import { error } from 'console';

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

interface UpdateStudent{
  name: string,
  classes: ClassInfo[]
}

interface ClassInfo {
  className: string,
  offered: boolean,
  taken: boolean,
  gradeOffered: number,
  classType: string
  classCategory: string
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

const exampleClassData: ClassInfo = {
  className: "AP Calculus AB",
  offered: true,
  taken: false, // since this is fake data, we can assume this class hasn't been taken yet
  gradeOffered: 11, // corresponds to the 11th grade
  classType: "ap", // using the lowercase string representation of the ClassType enum
  classCategory: "C", // assuming 'C' corresponds to Math in ClassCategory
  classDifficulty: 8, // an arbitrary difficulty rating
  students: [] // starting with an empty array of students
};

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
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

app.patch("/api/updateStudent", (req, res) =>{
  const { name, classes } = req.body;

  userDb
    .updateStudent(name, classes)
    .then(() => {
      res.status(201).send("User updated");
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).send("Error updating user: " + error.message);
    });
})


app.post("/api/createClass", async (req, res) => {
  try {
    const classData = req.body; // This is the fake data you receive from the API call
    const newClass = await userDb.createClass(classData);
    res.status(201).json(newClass);
  } catch (error:any) {
    res.status(500).send("Error creating class: " + error.message);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
