import mongoose from 'mongoose';
import { SKILLS_ENUM } from '../variable.js';

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    default: "John Doe"
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  course: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    enum: SKILLS_ENUM,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  }
);

studentSchema.index({ name: "text" });

export const Student = mongoose.model("Student", studentSchema);
