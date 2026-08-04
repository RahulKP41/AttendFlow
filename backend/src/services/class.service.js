import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import Student from "../models/student.model.js";
import ApiError from "../utils/api-error.js";

export const createClass = async (payload) => {

    const existingClass = await Class.findOne({
        department: payload.department,
        semester: payload.semester,
        section: payload.section,
        isActive: true
    });

    if (existingClass) {
        throw new ApiError(409, "Class already exists.");
    }

    if (payload.classTeacher) {

        const teacher = await Teacher.findById(payload.classTeacher);

        if (!teacher) {
            throw new ApiError(404, "Class teacher not found.");
        }

    }

    if (payload.subjects?.length) {

        const count = await Subject.countDocuments({
            _id: { $in: payload.subjects }
        });

        if (count !== payload.subjects.length) {
            throw new ApiError(404, "One or more subjects not found.");
        }

    }

    if (payload.students?.length) {

        const count = await Student.countDocuments({
            _id: { $in: payload.students }
        });

        if (count !== payload.students.length) {
            throw new ApiError(404, "One or more students not found.");
        }

    }

    return await Class.create(payload);
};