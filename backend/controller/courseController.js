import CourseModel from "../models/courseModel.js";
import mongoose from "mongoose";

export const addCourse = async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    await newCourse.save(); // speichert newCourse in Datenbank

    res.json({ msg: "Der Kur wurde in das Angebot eingebaut", newCourse });
  } catch (error) {
    res.send(error.message);
  }
};

export const findCourse = async (req, res) => {
  /* const shallPopulate = req.query.populate; */
  const courseId = req.params.id;

  try {
    let course;
    /* if (shallPopulate === "true") { */
    course = await CourseModel.findById(courseId)
      .populate("modulesIncluded");
    /* } else {
      course = await CourseModel
      .findById(courseId);
    } */

    res.json(course);
  } catch (error) {
    res.send(error.message);
  }
};

export const allCourses = async (req, res) => {
  const searchParam = req.query.name;
  try {
    let allCourses;
    if (searchParam) {
      allCourses = await CourseModel.find({
        courseName: {
          $regex: `${searchParam}`,
          $options: "i",
        },
      })
        .populate("modulesIncluded")
      res.send(allCourses);
    } else {
      allCourses = await CourseModel.find({})
        .populate("modulesIncluded")

      res.send(allCourses);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await CourseModel.findOneAndUpdate(
      { _id: courseId },
      // element to be changed
      { new: true }
    );

    res.json(course);
  } catch (error) {
    res.send(error.message);
  }
};

export const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const mongoResponse = await CourseModel.deleteOne(
      { _id: courseId }
    );
    res.send(mongoResponse);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ error: e.message });
  }
};

export const addModuleOnACourse = async (req, res /*,  courseId, moduleId */) => {
  //const courseID = courseId;
  //const modeuleID = moduleId;
  const courseID = req.params.id;
  const moduleID = req.body.moduleID;
  // console.log(moduleID)
  try {
    const course = await CourseModel.findOneAndUpdate(
      { _id: courseID },
      { $push: { modulesIncluded: moduleID } },
      { new: true }
    );
    res.json(course);
    return { msg: "This Module has been added to the course", moduleID };
  } catch (error) {
    res.send(error.message);
  }
};

export const deleteAModulefromACourse = async ( req, res /* , courseID, moduleID */) => {
  //const courseID = courseId;
  //const modeuleID = moduleId;
  const courseID = req.params.id;
  const deleteModule = req.body.moduleID;
  console.log(courseID, deleteModule);
  try {
    const course = await CourseModel.findOneAndUpdate(
      { _id: courseID },
      { $pull: { modulesIncluded: deleteModule } },
      { new: true }
    );
    res.json(course);
    return { msg: "This Module was deleted from the course", deleteModule };
  } catch (error) {
    return error.message;
  }
};
