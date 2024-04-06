"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var PrismaClient = require("@prisma/client").PrismaClient;
require("dotenv").config();
var prisma = new PrismaClient();
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
var GradeOffered;
(function (GradeOffered) {
    GradeOffered[GradeOffered["A"] = 9] = "A";
    GradeOffered[GradeOffered["B"] = 10] = "B";
    GradeOffered[GradeOffered["C"] = 11] = "C";
    GradeOffered[GradeOffered["D"] = 12] = "D";
})(GradeOffered || (GradeOffered = {}));
var IntendedDifficulty;
(function (IntendedDifficulty) {
    IntendedDifficulty[IntendedDifficulty["A"] = 0] = "A";
    IntendedDifficulty[IntendedDifficulty["B"] = 1] = "B";
    IntendedDifficulty[IntendedDifficulty["C"] = 2] = "C";
    IntendedDifficulty[IntendedDifficulty["D"] = 3] = "D";
})(IntendedDifficulty || (IntendedDifficulty = {}));
var fillerClasses = [{
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
    }];
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
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.createStudent = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            var createdStudent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.student.create({
                            data: {
                                name: student.name,
                                careerDecided: student.careerDecided,
                                careerPlan: student.careerPlan,
                                careerGoals: { set: student.careerGoals }, // Assuming careerGoals is an array
                                advancedClassCap: student.advancedClassCap,
                                totalClassCap: student.totalClassCap,
                                desiredDifficulty: student.desiredDifficulty,
                                // Add other fields as necessary according to your Prisma schema
                            },
                        })];
                    case 1:
                        createdStudent = _a.sent();
                        return [2 /*return*/, createdStudent];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
function ReadUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.student.findMany()];
                case 1:
                    allUsers = _a.sent();
                    console.log(allUsers);
                    return [2 /*return*/];
            }
        });
    });
}
ReadUsers().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }).catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
