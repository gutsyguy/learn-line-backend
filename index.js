"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const database_1 = require("./api/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const userDb = new database_1.Database();
var ClassType;
(function (ClassType) {
    ClassType[ClassType["regular"] = 0] = "regular";
    ClassType[ClassType["honor"] = 1] = "honor";
    ClassType[ClassType["ap"] = 2] = "ap";
    ClassType[ClassType["dualEnrollment"] = 3] = "dualEnrollment";
    ClassType[ClassType["ib"] = 4] = "ib";
})(ClassType || (ClassType = {}));
var ClassCategory;
(function (ClassCategory) {
    ClassCategory[ClassCategory["A"] = 0] = "A";
    ClassCategory[ClassCategory["B"] = 1] = "B";
    ClassCategory[ClassCategory["C"] = 2] = "C";
    ClassCategory[ClassCategory["D"] = 3] = "D";
    ClassCategory[ClassCategory["E"] = 4] = "E";
    ClassCategory[ClassCategory["F"] = 5] = "F";
    ClassCategory[ClassCategory["G"] = 6] = "G";
})(ClassCategory || (ClassCategory = {}));
const student = {
    id: 1,
    name: "Yalamber",
    careerDecided: true,
    careerPlan: "Software Engineer",
    careerGoals: [""],
    classes: [],
    advancedClassCap: 6,
    totalClassCap: 6,
    desiredDifficulty: "B"
};
const exampleClassData = {
    className: "AP Calculus AB",
    offered: true,
    taken: false, // since this is fake data, we can assume this class hasn't been taken yet
    gradeOffered: 11, // corresponds to the 11th grade
    classType: "ap", // using the lowercase string representation of the ClassType enum
    classCategory: "C", // assuming 'C' corresponds to Math in ClassCategory
    classDifficulty: 8, // an arbitrary difficulty rating
    students: [] // starting with an empty array of students
};
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
const getPostgresVersion = async () => {
    const client = await pool.connect();
    try {
        const response = await client.query("SELECT version()");
        console.log(response.rows[0]);
    }
    finally {
        client.release();
    }
};
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
    getPostgresVersion();
    res.send("Hello Bird");
});
app.get("/api/getStudent", (req, res) => {
    userDb.getAllStudents();
});
app.post("/api/createStudent", (req, res) => {
    // {name, careerDecided, careerPlan, careerGoals, classes, advancedClassCap, totalClassCap, desiredDifficulty} = req.body
    const studente = req.body;
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
app.post("/api/createClass", async (req, res) => {
    try {
        const classData = req.body; // This is the fake data you receive from the API call
        const newClass = await userDb.createClass(classData);
        res.status(201).json(newClass);
    }
    catch (error) {
        res.status(500).send("Error creating class: " + error.message);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
