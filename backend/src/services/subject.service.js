import Subject from "../models/subject.model.js";
import Teacher from "../models/teacher.model.js";
import ApiError from "../utils/api-error.js";

export const createSubject = async (payload) => {

    const existingSubject = await Subject.findOne({
        subjectCode: payload.subjectCode.toUpperCase()
    });

    if (existingSubject) {
        throw new ApiError(409, "Subject code already exists.");
    }

    if (payload.teacher) {

        const teacher = await Teacher.findById(payload.teacher);

        if (!teacher) {
            throw new ApiError(404, "Teacher not found.");
        }

    }

    const subject = await Subject.create({
        subjectCode: payload.subjectCode.toUpperCase(),
        subjectName: payload.subjectName,
        department: payload.department,
        semester: payload.semester,
        credits: payload.credits,
        teacher: payload.teacher || null
    });

    return subject;
};

export const getSubjects = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
        isActive: true
    };

    if (query.department) {
        filter.department = query.department;
    }

    if (query.semester) {
        filter.semester = Number(query.semester);
    }

    if (query.search) {
        filter.$or = [
            {
                subjectName: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                subjectCode: {
                    $regex: query.search,
                    $options: "i"
                }
            }
        ];
    }

    const subjects = await Subject.find(filter)
        .populate("teacher")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Subject.countDocuments(filter);

    return {
        subjects,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

export const getSubjectById = async (id) => {

    const subject = await Subject.findById(id)
        .populate("teacher");

    if (!subject) {
        throw new ApiError(404, "Subject not found.");
    }

    return subject;

};

export const updateSubject = async (id, payload) => {

    const subject = await Subject.findById(id);

    if (!subject) {
        throw new ApiError(404, "Subject not found.");
    }

    Object.assign(subject, payload);

    await subject.save();

    return subject;

};

export const deleteSubject = async (id) => {

    const subject = await Subject.findById(id);

    if (!subject) {
        throw new ApiError(404, "Subject not found.");
    }

    subject.isActive = false;

    await subject.save();

    return {
        message: "Subject deleted successfully."
    };

};