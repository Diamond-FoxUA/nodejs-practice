import { Student } from "../models/student.js";
import createHttpError from "http-errors";

export const getAllStudents = async (req, res) => {
  const { page = 1, perPage = 5, minAge, skills, searchText } = req.query;
  const skip = (page - 1) * perPage;

  // but requires params
  // const studentsQuery = Student.find().where('age').gte(minAge);

  // const studentsQuery = Student.find({
  //   age: { $gte: minAge},
  //   skills: { $eq: skills }
  // });

  const studentsQuery = Student.find({ userId: req.user._id });
  if (minAge) {
    studentsQuery.where("age").gte(minAge);
  }
  if (skills) {
    studentsQuery.where("skills").eq(skills);
  }
  if (searchText) {
    // select on frontend ["HTML", "CSS", "JavaScript"], for skills
    // studentsQuery.where({ $text: {$search: searchText} });

    // live input search || service – Atlas search, etc; redex for pet projects
    studentsQuery.where({ name: { $regex: searchText, $options: 'i' } });
  }

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    students
  });
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOne({
    _id: studentId,
    userId: req.user._id
  });

  if (!student) {
    throw createHttpError(404, "Student not found");
  }
  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndDelete({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndUpdate(
    {
      _id: studentId,
      userId: req.user._id,
    },
    req.body,
    { new: true }
  );

  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};
