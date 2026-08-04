import { z } from "zod";

export const createSubjectSchema = z.object({
    body: z.object({
        subjectCode: z
            .string()
            .trim()
            .min(2)
            .max(20),

        subjectName: z
            .string()
            .trim()
            .min(2)
            .max(100),

        department: z
            .string()
            .trim()
            .min(2)
            .max(50),

        semester: z
            .number()
            .min(1)
            .max(8),

        credits: z
            .number()
            .min(1)
            .max(10),

        teacher: z
            .string()
            .optional()
            .nullable()
    })
});

export const updateSubjectSchema = createSubjectSchema;