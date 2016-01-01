import express from "express";
import  LearningDeskModel from "../models/learningDeskModel.js";
import UserModel from "../models/userModel.js";


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

 export const addALearningDesk = async (myUserId) => {
  try {
    const newLearningDesk = new LearningDeskModel();
    await newLearningDesk.save(); 
    console.log(myUserId)
    //const userId = req.body.id;
    const userId = myUserId
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$set:{myLearningDesk: newLearningDesk._id}} //statt ObjectId
      )
      /* console.log(newLearningDesk._id)
      console.log(user) */
    return ({ msg: "Ihr Schreibtisch wurde eingerichtet", newLearningDesk});
  } catch (error) {
    return (error.message);
  }
};