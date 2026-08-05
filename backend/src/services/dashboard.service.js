import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";
import Attendance from "../models/attendance.model.js";




export const getDashboard = async () => {

    const today = new Date();

    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const [

        totalStudents,

        totalTeachers,

        totalSubjects,

        totalClasses,

        todayAttendance

    ] = await Promise.all([

        Student.countDocuments(),

        Teacher.countDocuments(),

        Subject.countDocuments(),

        Class.countDocuments(),

        Attendance.countDocuments({

            attendanceDate: {

                $gte: today,

                $lt: tomorrow

            }

        })

    ]);

    return {

        totalStudents,

        totalTeachers,

        totalSubjects,

        totalClasses,

        todayAttendance

    };

};

export const getMonthlyStudentRegistrations = async () => {

    const result = await Student.aggregate([

        {
            $group: {

                _id: {

                    year: {
                        $year: "$createdAt"
                    },

                    month: {
                        $month: "$createdAt"
                    }

                },

                totalStudents: {
                    $sum: 1
                }

            }

        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1
            }
        }

    ]);

    return result;

};

export const getAttendanceTrend = async () => {

    return await Attendance.aggregate([

        {

            $group: {

                _id: {

                    day: {

                        $dayOfWeek: "$attendanceDate"

                    }

                },

                totalAttendance: {

                    $sum: 1

                }

            }

        },

        {

            $sort: {

                "_id.day": 1

            }

        }

    ]);

};

export const getDepartmentStatistics = async () => {

    return await Student.aggregate([

        {

            $group: {

                _id: "$department",

                students: {

                    $sum: 1

                }

            }

        },

        {

            $sort: {

                students: -1

            }

        }

    ]);

};







