import Attendance from "../models/attendance.model.js";
import Class from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import Student from "../models/student.model.js";
import ApiError from "../utils/api-error.js";
import mongoose from "mongoose";

export const markAttendance = async (payload) => {

    const {
        classId,
        subjectId,
        attendanceDate,
        students
    } = payload;

    // Check class
    const classData = await Class.findById(classId);

    if (!classData) {
        throw new ApiError(404, "Class not found.");
    }

    // Check subject
    const subject = await Subject.findById(subjectId);

    if (!subject) {
        throw new ApiError(404, "Subject not found.");
    }

    // Prevent duplicate attendance
    const alreadyMarked = await Attendance.findOne({
        class: classId,
        subject: subjectId,
        attendanceDate: new Date(attendanceDate)
    });

    if (alreadyMarked) {
        throw new ApiError(
            409,
            "Attendance already marked for this class."
        );
    }

    const attendanceRecords = [];

    for (const item of students) {

        const student = await Student.findById(item.studentId);

        if (!student) {
            throw new ApiError(
                404,
                `Student not found: ${item.studentId}`
            );
        }

        attendanceRecords.push({
            student: item.studentId,
            class: classId,
            subject: subjectId,
            teacher: subject.teacher,
            attendanceDate,
            status: item.status,
            remarks: item.remarks || ""
        });

    }

    const result = await Attendance.insertMany(attendanceRecords);

    return result;

};

export const getAttendanceByDate = async (
    classId,
    subjectId,
    attendanceDate
) => {

    const attendance = await Attendance.find({
        class: classId,
        subject: subjectId,
        attendanceDate: new Date(attendanceDate)
    })
        .populate("student", "firstName lastName rollNumber")
        .populate("teacher", "firstName lastName")
        .populate("subject", "subjectName");

    return attendance;

};

export const updateAttendance = async (attendanceId, payload) => {

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
        throw new ApiError(404, "Attendance record not found.");
    }

    attendance.status = payload.status;

    attendance.remarks = payload.remarks || "";

    await attendance.save();

    return attendance;

};

export const getStudentAttendanceHistory = async (studentId) => {

    const attendance = await Attendance.find({
        student: studentId
    })
        .populate("subject", "subjectName subjectCode")
        .populate("teacher", "firstName lastName")
        .populate("class", "className section semester")
        .sort({
            attendanceDate: -1
        });

    return attendance;

};

export const getAttendancePercentage = async (studentId) => {

    const result = await Attendance.aggregate([

        {
            $match: {
                student: new mongoose.Types.ObjectId(studentId)
            }
        },

        {
            $group: {

                _id: "$student",

                totalClasses: {
                    $sum: 1
                },

                present: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Present"] },
                            1,
                            0
                        ]
                    }
                },

                absent: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Absent"] },
                            1,
                            0
                        ]
                    }
                },

                late: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Late"] },
                            1,
                            0
                        ]
                    }
                }

            }
        }

    ]);

    if (!result.length) {

        return {
            totalClasses: 0,
            present: 0,
            absent: 0,
            late: 0,
            percentage: 0
        };

    }

    const stats = result[0];

    return {

        ...stats,

        percentage:
            Number(
                (
                    (stats.present / stats.totalClasses) * 100
                ).toFixed(2)
            )

    };

};

export const getSubjectWiseAttendance = async (studentId) => {

    const report = await Attendance.aggregate([

        {
            $match: {
                student: new mongoose.Types.ObjectId(studentId)
            }
        },

        {
            $group: {

                _id: "$subject",

                totalClasses: {
                    $sum: 1
                },

                present: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Present"] },
                            1,
                            0
                        ]
                    }
                },

                absent: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Absent"] },
                            1,
                            0
                        ]
                    }
                },

                late: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Late"] },
                            1,
                            0
                        ]
                    }
                }

            }

        },

        {
            $lookup: {

                from: "subjects",

                localField: "_id",

                foreignField: "_id",

                as: "subject"

            }

        },

        {
            $unwind: "$subject"
        }

    ]);

    return report.map(item => ({

        subjectId: item._id,

        subjectName: item.subject.subjectName,

        subjectCode: item.subject.subjectCode,

        totalClasses: item.totalClasses,

        present: item.present,

        absent: item.absent,

        late: item.late,

        percentage: Number(
            (
                item.present / item.totalClasses * 100
            ).toFixed(2)
        )

    }));

};

export const getMonthlyAttendance = async (
    studentId,
    month,
    year
) => {

    month = Number(month);
    year = Number(year);

    const report = await Attendance.aggregate([

        {
            $match: {

                student: new mongoose.Types.ObjectId(studentId),

                $expr: {

                    $and: [

                        {
                            $eq: [
                                {
                                    $month: "$attendanceDate"
                                },
                                month
                            ]
                        },

                        {
                            $eq: [
                                {
                                    $year: "$attendanceDate"
                                },
                                year
                            ]
                        }

                    ]

                }

            }

        },

        {

            $group: {

                _id: null,

                totalClasses: {
                    $sum: 1
                },

                present: {

                    $sum: {

                        $cond: [

                            {
                                $eq: [
                                    "$status",
                                    "Present"
                                ]
                            },

                            1,

                            0

                        ]

                    }

                },

                absent: {

                    $sum: {

                        $cond: [

                            {
                                $eq: [
                                    "$status",
                                    "Absent"
                                ]
                            },

                            1,

                            0

                        ]

                    }

                },

                late: {

                    $sum: {

                        $cond: [

                            {
                                $eq: [
                                    "$status",
                                    "Late"
                                ]
                            },

                            1,

                            0

                        ]

                    }

                }

            }

        }

    ]);

    if (!report.length) {

        return {

            month,

            year,

            totalClasses: 0,

            present: 0,

            absent: 0,

            late: 0,

            percentage: 0

        };

    }

    const stats = report[0];

    return {

        month,

        year,

        totalClasses: stats.totalClasses,

        present: stats.present,

        absent: stats.absent,

        late: stats.late,

        percentage: Number(

            (
                stats.present /
                stats.totalClasses *
                100
            ).toFixed(2)

        )

    };

};


