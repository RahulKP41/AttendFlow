import mongoose from "mongoose";
import { ATTENDANCE_STATUS } from "../constants/attendance.constants.js";

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true
        },

        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true
        },

        attendanceDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Present", "Absent", "Late"],
            default: "Present"
        },

        remarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

attendanceSchema.index({
    class: 1,
    subject: 1,
    attendanceDate: 1
});

attendanceSchema.index({
    student: 1,
    attendanceDate: 1
});

attendanceSchema.index({
    teacher: 1,
    attendanceDate: 1
});

export default mongoose.model("Attendance", attendanceSchema);