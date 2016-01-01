import UserModel from "./userModel.js";
import ModuleModel from "./moduleModel.js";
import { updateCourse } from "../controller/courseController.js";
import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    maxLength: 100,
    required: true,
  },
  courseInShort: {
    type: String,
    maxLength: 20,
    required: true,
    index: true,
  },
  /*   category: {
    type: String,
    enum: ["webdesign", "online marketing", "AWS", "Networks", "Java"],
    required: true,
  }, */
  courseActive: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: true,
  },
  dateOfStart: {
    type: Date,
    required: true,
    trim: true,
  },
  courseImage: {
    type: String,
    default:""
  },
  courseIcon: {
    type: String,
    default:""
  },
  courseDuration: {
    type: Number,
    required: true,
    default:""
  },
  coursePrice: {
    type: Number,
    required: false,
    default:""
  },
  courseType: {
    type: String,
    enum: ["fulltime", "parttime"],
    required: false,
    default:""
  },
  language: {
    type: String,
    enum: ["German", "English", "Russian"],
    required: true,
    default: "German",
  },
  courseDescription: {
    type: String,
    maxLength: 300,
    required: true,
    default:""
  },
  /* takenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], */
  modulesIncluded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

/* courseSchmema.virtual("currentUser").get(function () => {
  const currentYear = new Date().getFullYear();
  return currentYear - this.year;
}); */

courseSchema.pre(["updateCourse", "findOneAndUpdate"], function (next) {
  next();
});

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
