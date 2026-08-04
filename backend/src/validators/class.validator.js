import { z } from "zod";

export const createClassSchema = z.object({
    body: z.object({
        className: z.string().trim().min(2).max(100),

        department: z.string().trim().min(2).max(50),

        semester: z.number().min(1).max(8),

        section: z.string().trim().min(1).max(5),

        classTeacher: z.string().optional().nullable(),

        subjects: z.array(z.string()).optional(),

        students: z.array(z.string()).optional()
    })
});

export const updateClassSchema = createClassSchema;