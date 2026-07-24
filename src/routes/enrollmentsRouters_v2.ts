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

// DELETE /api/enrollments

router.delete('/' ,(req:Request , res:Response) => {
    try{
        const body = req.body;

        const foundIndex = enrollments.findIndex(
        (e) => e.studentId === body.studentId && e.courseId === body.courseNo
        );

        if (foundIndex === -1) {
        return res.status(404).json({
            ok: false,
            message: "Enrollment does not exist",
        });
        }

        enrollments.splice(foundIndex, 1);

        res.status(200).json({
        ok: true,
        message: "Enrollment has been deleted",
        });

        }catch(err){
            return res.status(500).json({
                ok:false,
                message: "Something is wrong, please try again",
            })
        }
    })



export default router;