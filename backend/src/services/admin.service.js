import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Subject from "../models/subject.model.js";
import ClassSection from "../models/class-section.model.js";
import Attendance from "../models/attendance.model.js";
import mongoose from "mongoose";

import User from "../models/user.model.js";

import { hashPassword } from "../utils/password.js";

import { ROLES } from "../constants/role.constants.js";
import { USER_STATUS } from "../constants/status.constants.js";

import ApiError from "../utils/api-error.js";

export const getDashboardStatistics = async () => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const [
        totalTeachers,
        totalStudents,
        totalSubjects,
        totalClassSections,
        todayAttendance
    ] = await Promise.all([

        Teacher.countDocuments(),

        Student.countDocuments(),

        Subject.countDocuments(),

        ClassSection.countDocuments(),

        Attendance.countDocuments({
            attendanceDate: {
                $gte: today,
                $lt: tomorrow
            }
        })

    ]);

    return {

        totalTeachers,

        totalStudents,

        totalSubjects,

        totalClassSections,

        todayAttendance

    };

};

export const createTeacher = async (payload) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const existingUser = await User.findOne({
            email: payload.email
        });

        if (existingUser) {
            throw new ApiError(
                409,
                "Email already exists."
            );
        }

        const existingTeacher = await Teacher.findOne({
            employeeId: payload.employeeId
        });

        if (existingTeacher) {
            throw new ApiError(
                409,
                "Employee ID already exists."
            );
        }

        const hashedPassword = await hashPassword(
            payload.password
        );

        const user = await User.create(
            [
                {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: hashedPassword,
                    role: ROLES.TEACHER,
                    status: USER_STATUS.ACTIVE
                }
            ],
            { session }
        );

        const teacher = await Teacher.create(
            [
                {
                    user: user[0]._id,
                    employeeId: payload.employeeId,
                    department: payload.department,
                    qualification: payload.qualification,
                    phone: payload.phone,
                    gender: payload.gender
                }
            ],
            { session }
        );

        await session.commitTransaction();

        session.endSession();

        return teacher[0];

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

};
export const getTeachers = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const search = query.search?.trim() || "";

    let teacherFilter = {};

    if (search) {
        const users = await User.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }).select("_id");

        teacherFilter = {
            $or: [
                {
                    user: {
                        $in: users.map(user => user._id)
                    }
                },
                {
                    employeeId: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        };
    }

    const total = await Teacher.countDocuments(teacherFilter);

    const teachers = await Teacher.find(teacherFilter)
        .populate({
            path: "user",
            select: "-password"
        })
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    return {
        teachers,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const getTeacherById = async (teacherId) => {

    const teacher = await Teacher.findById(teacherId)
        .populate({
            path: "user",
            select: "-password"
        });

    if (!teacher) {
        throw new ApiError(404, "Teacher not found.");
    }

    return teacher;
};

export const updateTeacher = async (teacherId, payload) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const teacher = await Teacher.findById(teacherId).session(session);

        if (!teacher) {
            throw new ApiError(404, "Teacher not found.");
        }

        const user = await User.findById(teacher.user).session(session);

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        // Check duplicate email
        const existingEmail = await User.findOne({
            email: payload.email,
            _id: { $ne: user._id }
        }).session(session);

        if (existingEmail) {
            throw new ApiError(409, "Email already exists.");
        }

        // Check duplicate employee ID
        const existingEmployee = await Teacher.findOne({
            employeeId: payload.employeeId,
            _id: { $ne: teacher._id }
        }).session(session);

        if (existingEmployee) {
            throw new ApiError(409, "Employee ID already exists.");
        }

        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.email = payload.email;

        await user.save({ session });

        teacher.employeeId = payload.employeeId;
        teacher.department = payload.department;
        teacher.qualification = payload.qualification;
        teacher.phone = payload.phone;
        teacher.gender = payload.gender;

        await teacher.save({ session });

        await session.commitTransaction();

        session.endSession();

        return await Teacher.findById(teacher._id)
            .populate("user", "-password");

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;
    }

};

export const deleteTeacher = async (teacherId) => {

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
        throw new ApiError(404, "Teacher not found.");
    }

    const user = await User.findById(teacher.user);

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    user.status = USER_STATUS.INACTIVE;

    await user.save();

    return {
        message: "Teacher deactivated successfully."
    };

};

export const createStudent = async (payload) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const existingUser = await User.findOne({
            email: payload.email
        }).session(session);

        if (existingUser) {
            throw new ApiError(409, "Email already exists.");
        }

        const existingEnrollment = await Student.findOne({
            enrollmentNumber: payload.enrollmentNumber
        }).session(session);

        if (existingEnrollment) {
            throw new ApiError(409, "Enrollment number already exists.");
        }

        const existingRoll = await Student.findOne({
            rollNumber: payload.rollNumber
        }).session(session);

        if (existingRoll) {
            throw new ApiError(409, "Roll number already exists.");
        }

        const hashedPassword = await hashPassword(payload.password);

        const [user] = await User.create(
            [{
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hashedPassword,
                role: ROLES.STUDENT,
                status: USER_STATUS.ACTIVE
            }],
            { session }
        );

        const [student] = await Student.create(
            [{
                user: user._id,
                enrollmentNumber: payload.enrollmentNumber,
                rollNumber: payload.rollNumber,
                department: payload.department,
                semester: payload.semester,
                section: payload.section,
                phone: payload.phone,
                gender: payload.gender
            }],
            { session }
        );

        await session.commitTransaction();

        return student;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

};

export const getStudents = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search?.trim() || "";

    let filter = {};

    if (search) {

        const users = await User.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }).select("_id");

        filter = {
            $or: [
                {
                    user: {
                        $in: users.map(user => user._id)
                    }
                },
                {
                    enrollmentNumber: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    rollNumber: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        };

    }

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
        .populate("user", "-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        students,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };

};

export const getStudentById = async (studentId) => {

    const student = await Student.findById(studentId)
        .populate("user", "-password");

    if (!student) {
        throw new ApiError(404, "Student not found.");
    }

    return student;

};
