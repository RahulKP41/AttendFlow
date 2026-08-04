import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
{
    className: {
        type: String,
        required: true,
        trim: true
    },

    department: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        default: null
    },

    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],

    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

classSchema.index({
    department:1,
    semester:1,
    section:1
});

export default mongoose.model("Class", classSchema);