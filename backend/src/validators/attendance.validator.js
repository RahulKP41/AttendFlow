import { z } from "zod";

export const markAttendanceSchema = z.object({
    body: z.object({
        classId: z.string(),

        subjectId: z.string(),

        attendanceDate: z.string(),

        students: z.array(
            z.object({
                studentId: z.string(),

                status: z.enum([
                    "Present",
                    "Absent",
                    "Late"
                ]),

                remarks: z.string().optional()
            })
        ).min(1)
    })
});

export const updateAttendanceSchema = z.object({
    body: z.object({
        status: z.enum([
            "Present",
            "Absent",
            "Late"
        ]),

        remarks: z.string().optional()
    })
});

export const createAttendanceSchema = z.object({
    body: z.object({
        student: z.string(),
        subject: z.string(),
        class: z.string(),
        status: z.enum(["Present", "Absent", "Late"])
    })
});