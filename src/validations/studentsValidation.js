import { Joi, Segments } from "celebrate";
import { SKILLS_ENUM } from "../variable.js";
import { isValidObjectId } from "mongoose";

export const getAllStudentsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(5).max(15),
  }),
};

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(15).allow(""),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(10).max(50).required(),
    course: Joi.number().integer().required(),
    group: Joi.string().min(1).required(),
    skills: Joi.string().valid(...SKILLS_ENUM).required(),
    isActive: Joi.boolean(),
  }),
};

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message("This ID is not valid!");
  }
  return value;
};

export const studentParamIdSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateStudentSchema = {
  // ...studentParamIdSchema,
  [Segments.PARAMS]: Joi.object({
      studentId: Joi.string().custom(objectIdValidator).required(),
    }),

  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(15).allow(""),
    email: Joi.string().email(),
    age: Joi.number().integer().min(10).max(50),
    course: Joi.number().integer(),
    group: Joi.string().min(1),
    skills: Joi.string().valid(...SKILLS_ENUM),
    isActive: Joi.boolean(),
  }).min(1),
};
