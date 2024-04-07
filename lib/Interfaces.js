"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeOffered = exports.IntendedDifficulty = exports.ClassCategory = exports.ClassType = void 0;
var ClassType;
(function (ClassType) {
    ClassType[ClassType["regular"] = 0] = "regular";
    ClassType[ClassType["honor"] = 1] = "honor";
    ClassType[ClassType["ap"] = 2] = "ap";
    ClassType[ClassType["dualEnrollment"] = 3] = "dualEnrollment";
    ClassType[ClassType["ib"] = 4] = "ib";
})(ClassType || (exports.ClassType = ClassType = {}));
var ClassCategory;
(function (ClassCategory) {
    ClassCategory[ClassCategory["A"] = 0] = "A";
    ClassCategory[ClassCategory["B"] = 1] = "B";
    ClassCategory[ClassCategory["C"] = 2] = "C";
    ClassCategory[ClassCategory["D"] = 3] = "D";
    ClassCategory[ClassCategory["E"] = 4] = "E";
    ClassCategory[ClassCategory["F"] = 5] = "F";
    ClassCategory[ClassCategory["G"] = 6] = "G";
})(ClassCategory || (exports.ClassCategory = ClassCategory = {}));
var IntendedDifficulty;
(function (IntendedDifficulty) {
    IntendedDifficulty[IntendedDifficulty["A"] = 0] = "A";
    IntendedDifficulty[IntendedDifficulty["B"] = 1] = "B";
    IntendedDifficulty[IntendedDifficulty["C"] = 2] = "C";
    IntendedDifficulty[IntendedDifficulty["D"] = 3] = "D";
})(IntendedDifficulty || (exports.IntendedDifficulty = IntendedDifficulty = {}));
var GradeOffered;
(function (GradeOffered) {
    GradeOffered[GradeOffered["A"] = 9] = "A";
    GradeOffered[GradeOffered["B"] = 10] = "B";
    GradeOffered[GradeOffered["C"] = 11] = "C";
    GradeOffered[GradeOffered["D"] = 12] = "D";
})(GradeOffered || (exports.GradeOffered = GradeOffered = {}));
