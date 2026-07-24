import { Router, type Request, type Response } from "express";
import {
  zStudentPostBody,
  zStudentPutBody,
  zStudentId,
} from "../libs/zodValidators.js";

import type { Student, Course } from "../libs/types.js";

// import database
import { students, courses, enrollments } from "../db/db.js";

const router = Router();

//GET /api/v1/enrollments
router.get('/',(req:Request,res:Response) =>{
    try{
        const courseNo = req.query.courseNo;
        const studentId = req.query.studentId;

        if ((!courseNo && !studentId) || (courseNo && studentId)) {
            return res.status(400).json({
                ok: false,
                message: "Please provide either studentId or courseNo  and not both!"
            });
        }

        if(courseNo){
            const foundCourse = courses.find(
                (c) => c.courseId === courseNo
            );

            if(!foundCourse){
                return res.status(404).json({
                    ok: false,
                    message:"Not Found"
                })
            }

                const checkEnrollment = enrollments.filter(
                    (e) => e.courseId === foundCourse.courseId
            );

                const resultStudent = checkEnrollment.map((e)=>{
                    return students.find(
                        (std) => std.studentId === e.studentId
                    );
            });
            return res.status(200).json({
            ok:true,
            students: resultStudent
        })
        }

        if (studentId) {
            const checkEnrollment_std = enrollments.filter(
                (e) => e.studentId === studentId
            );

            const resultCourse = checkEnrollment_std.map((e) => {
                const foundCourse_std = courses.find(
                (c) => c.courseId === e.courseId
                );

                return {
                courseNo: foundCourse_std?.courseId,
                title: foundCourse_std?.courseTitle
                };
            });

            return res.status(200).json({
                ok: true,
                courses: resultCourse
                });
            }

    }catch(err){
        return res.status(500).json({
            ok: false,
            message: "Something is wrong, please try again",
            error: err,
        })
    }
})





export default router;
