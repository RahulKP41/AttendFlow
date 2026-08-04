import mongoose from "mongoose";
import { ATTENDANCE_STATUS } from "../constants/attendance.constants.js";

const attendanceSchema = new mongoose.Schema(
    {
        classSection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClassSection",
            required: true
        },

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
            enum: Object.values(ATTENDANCE_STATUS),
            required: true
        },

        remarks: {
            type: String,
            trim: true,
            default: ""
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

/*
|--------------------------------------------------------------------------
| Prevent duplicate attendance
|--------------------------------------------------------------------------
*/

attendanceSchema.index(
    {
        student: 1,
        subject: 1,
        attendanceDate: 1
    },
    {
        unique: true
    }
);

/*
|--------------------------------------------------------------------------
| Reporting indexes
|--------------------------------------------------------------------------
*/

attendanceSchema.index({
    classSection: 1,
    attendanceDate: 1
});

attendanceSchema.index({
    teacher: 1
});

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

export default Attendance;