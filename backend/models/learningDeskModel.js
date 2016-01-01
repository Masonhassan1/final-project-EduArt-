import UserModel from "./userModel.js";
import ModuleModel from "./moduleModel.js";
import { updateCourse } from "../controller/courseController.js";
import mongoose from "mongoose";

const coursesOnDeskSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  statusOfCourseDuration: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required:true
  },
  numberOfModulesFinished: {
    type: Number,
    min: 0,
    max: 20,
    default: 0,
    required:true
  },
  assessmentsPointsAchieved: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required:false
  },
  courseActive: {
    type: Boolean,
    required: true,
    enum: ["true", "false"],
    default: "true",
  },
  dateOfCourseStart: {
    type: Date,
    trim: true,
    default: Date.now,
  }
});

const learningDeskSchema = mongoose.Schema({
  deskActive: {
    type: Boolean,
    required: true,
    enum: ["true", "false"],
    default: "true",
  },
  coursesBooked: [
    {
      type: coursesOnDeskSchema,
    },
  ],
  dateOfStart: {
    type: Date,
    trim: true,
    default: Date.now,
  }
});

learningDeskSchema.pre(
  ["updateALearningDesk", "findOneAndUpdate"],
  function (next) {
    next();
  }
);

const LearningDeskModel = mongoose.model("LearningDesk", learningDeskSchema);
export default LearningDeskModel;
