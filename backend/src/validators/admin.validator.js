import { z } from "zod";

export const createTeacherSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(2).max(50),
        lastName: z.string().trim().min(2).max(50),
        email: z.string().trim().email(),
        password: z
            .string()
            .min(8)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),
        employeeId: z.string().trim().min(3),
        department: z.string().trim().min(2),
        qualification: z.string().trim().min(2),
        phone: z.string().trim().min(10).max(15),
        gender: z.enum(["Male", "Female", "Other"])
    })
});

export const updateTeacherSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(2).max(50),
        lastName: z.string().trim().min(2).max(50),
        email: z.string().trim().email(),
        employeeId: z.string().trim().min(3),
        department: z.string().trim().min(2),
        qualification: z.string().trim().min(2),
        phone: z.string().trim().min(10).max(15),
        gender: z.enum(["Male", "Female", "Other"])
    })
});

export const createStudentSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(2).max(50),

        lastName: z.string().trim().min(2).max(50),

        email: z.string().trim().email(),

        password: z
            .string()
            .min(8)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        enrollmentNumber: z.string().trim().min(3),

        rollNumber: z.string().trim().min(3),

        department: z.string().trim().min(2),

        semester: z.number().min(1).max(8),

        section: z.string().trim().min(1).max(5),

        phone: z.string().trim().min(10).max(15),

        gender: z.enum(["Male", "Female", "Other"])
    })
});

export const updateStudentSchema = z.object({
    body: z.object({
        firstName: z.string().trim().min(2).max(50),

        lastName: z.string().trim().min(2).max(50),

        email: z.string().trim().email(),

        enrollmentNumber: z.string().trim().min(3),

        rollNumber: z.string().trim().min(3),

        department: z.string().trim().min(2),

        semester: z.number().min(1).max(8),

        section: z.string().trim().min(1).max(5),

        phone: z.string().trim().min(10).max(15),

        gender: z.enum(["Male", "Female", "Other"])
    })
});