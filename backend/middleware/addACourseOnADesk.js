import express from "express";
import LearningDeskModel from "../models/learningDeskModel.js";


// derzeuit nicht in Use
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

 export const addACourseOnADesk = async (myAddedCourse, myDeskID ) => {
   //const myAddedCourse = req.body.courseId
   //const myDeskID = req.body.deskId
  
  try {
    const learningDesk = await LearningDeskModel
      .findOneAndUpdate(
        {_id:myDeskID},
        {$push:{coursesBooked: {courseId:myAddedCourse}}},
        {new: true}
        )
    return ({ msg: "This Course was added onto your desk", learningDesk});
  } catch (error) {
    return (error.message);
  }
};