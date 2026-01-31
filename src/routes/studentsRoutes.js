import { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/studentsController.js";
import { celebrate } from "celebrate";
import { getAllStudentsSchema, createStudentSchema, studentParamIdSchema, updateStudentSchema } from "../validations/studentsValidation.js";


const router = Router();

router.get('/students',celebrate(getAllStudentsSchema), getAllStudents);
router.get('/students/:studentId', celebrate(studentParamIdSchema), getStudentById);
router.post('/students', celebrate(createStudentSchema), createStudent);
router.delete('/students/:studentId', celebrate(studentParamIdSchema), deleteStudent);
router.patch('/students/:studentId', celebrate(updateStudentSchema), updateStudent);

export default router;
