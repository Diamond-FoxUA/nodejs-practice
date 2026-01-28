import { Student } from "../models/student.js";
import createHttpError from "http-errors";

export const getAllStudents = async (req, res) => {
  const students = await Student.find();

  res.status(200).json(students);
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findById(studentId);

  if (!student) {
    throw createHttpError(404, "Student not found");
  }
  res.status(200).json(student);
};

export const createStudent = (req, res) => {
  res.status(201).json({ msg: `Student created` });
};

export const deleteStudent = (req, res) => {
  res.status(200).json({ msg: 'Student deleted' });
};
