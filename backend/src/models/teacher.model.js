import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        employeeId: {
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

        qualification: {
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

teacherSchema.index({ employeeId: 1 });
teacherSchema.index({ department: 1 });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;