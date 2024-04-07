
export enum ClassType{
    regular,
    honor,
    ap,
    dualEnrollment,
    ib,
  }
  
  export enum ClassCategory{
    A,
    B,
    C,
    D,
    E,
    F,
    G
  }
  
  export enum IntendedDifficulty{
    A,
    B,
    C,
    D, 
  }  

export enum GradeOffered{
    A = 9,
    B = 10,
    C = 11,
    D = 12
  }

export interface ClassInfo {
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
    desiredDifficulty: IntendedDifficulty 
  }