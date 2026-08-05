import Student from "../models/student.model.js";
import Attendance from "../models/attendance.model.js";



export const getStudentDashboard = async (studentId) => {

    const student =
        await Student.findById(studentId);

    const attendance =
        await Attendance.find({
            student: studentId
        });

    const totalClasses = attendance.length;

    const present = attendance.filter(
        item => item.status === "Present"
    ).length;

    const percentage =
        totalClasses === 0
            ? 0
            : Number(
                  (
                      present /
                      totalClasses *
                      100
                  ).toFixed(2)
              );

    return {

        student,

        totalClasses,

        present,

        percentage

    };

};