import express from "express";
import UserModel from "../models/userModel.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

 export const addAPurchaseToAUser = async (purchaseId, userId) => {
   const addPurchase = purchaseId
   const userID = userId
      
  try {
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userID},
      {$push:{myPurchases: addPurchase}},
      {new: true} 
      )
    //res.json(user)
    return ({ msg: `The Purchase ${addPurchase} was added to the requested user ${userID}`});
  } catch (error) {
    return (error.message);
  }
};
