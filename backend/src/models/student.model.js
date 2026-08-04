import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        enrollmentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        rollNumber: {
            type: String,
            required: true,
            unique: true,
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

        section: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

studentSchema.index({ enrollmentNumber: 1 });
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ department: 1 });
studentSchema.index({ semester: 1 });

const Student = mongoose.model("Student", studentSchema);

export default Student;