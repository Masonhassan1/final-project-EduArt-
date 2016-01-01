import UserModel from "./userModel.js";
import ModuleModel from "./moduleModel.js";
import { updateCourse } from "../controller/courseController.js";
import mongoose from "mongoose";

const coursesOnDeskSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      unique: false
    },
    statusOfCourseDuration: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    numberOfModulesFinished: {
      type: Number,
      min: 0,
      max: 20,
      default: 0
    },
    assessmentsPointsAchieved: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }
);

const learningDeskSchema = mongoose.Schema({
  deskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  deskActive: {
    type: Boolean,
    required: true,
    enum: ["true", "false"],
    default: "false",
  },
  coursesBooked: [
    {
      type: coursesOnDeskSchema,
    },
  ],
  /* courseBooked: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        unique: false,
      },
      statusOfCourseDuration: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      numberOfModulesFinished: {
        type: Number,
        min: 0,
        max: 20,
        default: 0,
      },
    },
  ], */
  dateOfStart: {
    type: Date,
    trim: true,
    default: Date.now,
  },
});

learningDeskSchema.pre(
  ["updateALearningDesk", "findOneAndUpdate"],
  function (next) {
    next();
  }
);

const LearningDeskModel = mongoose.model("LearningDesk", learningDeskSchema);
export default LearningDeskModel;
