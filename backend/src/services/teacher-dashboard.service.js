import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";
import Attendance from "../models/attendance.model.js";


export const getTeacherDashboard = async (teacherId) => {

    const [

        teacher,

        subjects,

        classes,

        attendance

    ] = await Promise.all([

        Teacher.findById(teacherId),

        Subject.countDocuments({
            teacher: teacherId
        }),

        Class.countDocuments({
            classTeacher: teacherId
        }),

        Attendance.countDocuments({
            teacher: teacherId
        })

    ]);

    return {

        teacher,

        totalSubjects: subjects,

        totalClasses: classes,

        attendanceMarked: attendance

    };

};