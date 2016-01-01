import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

/* export const addUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body); 
    await newUser.save();
    res.json({ msg: "Sie wurden als neuer Nutzer gespeichert", newUser });
  } catch (error) {
    res.send(error.message);
  }
}; */


export const findUser = async (req, res) => {
  const userId = req.params.id;

  try {
    let user;
      user = await UserModel
        .findById(userId)
        .populate("myLearningDesk")
        .populate({
          path: "myPurchases",
          populate:{
            path:"purchasedCourse"}
          })
        .populate("myCertificats")
    res.json(user);
  } catch (error) {
    res.send(error.message);
  }
};

export const userList = async (req, res) => {
  try {
    const allUser = await UserModel
      .find({})
      .populate("myLearningDesk");
    res.send(allUser)
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  const user = await UserModel
  .findById(userId)
  if( req.body.password !== user.password ){
    //console.log("UserModel",user.password)
    const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);
    req.body.password = hashedSaltyPassword
  }

  try {
    const user1 = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      req.body,
      {new: true, runValidators:true});
    res.json(user1);
  } catch (error) {
    res.send(error.message);
  }
};

export const updateUserImage = async (req, res) => {
  const userId = req.params.id;
   
  try {
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      req.body,
      {new: true, runValidators:true});
    res.json(user);
  } catch (error) {
    res.send(error.message);
  }
};


export const deleteUser = async (req, res) => {
  
  const userId = req.params.id;
  try {
    const mongoResponse = await UserModel
    .deleteOne( {_id: userId} );

    res.send(mongoResponse);
    
  } catch(e) {
    console.error(e.message);
    res.status(500).send({error: e.message})
  }
}

export const deactivateUser = async (res, myUserId) => {
  const userId = myUserId
  try {
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$set:{active: false}},
      {new: true});
    res.json(user);
  } catch (error) {
    res.send(error.message);
  }
};