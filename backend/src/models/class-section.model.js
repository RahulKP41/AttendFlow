import mongoose from "mongoose";

const classSectionSchema = new mongoose.Schema(
    {
        className: {
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

        section: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },

        academicYear: {
            type: String,
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

        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }
        ],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

classSectionSchema.index({
    department: 1,
    semester: 1,
    section: 1
});

classSectionSchema.index({
    teacher: 1
});

const ClassSection = mongoose.model(
    "ClassSection",
    classSectionSchema
);

export default ClassSection;