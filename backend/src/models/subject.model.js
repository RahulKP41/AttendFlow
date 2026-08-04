import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        subjectCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        subjectName: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8
        },

        credits: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },

        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

subjectSchema.index({ subjectCode: 1 });
subjectSchema.index({ department: 1, semester: 1 });

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
