import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addALearningDesk } from "../middleware/addALearningDesk.js";

/**
 * @param {express.Response} res
 */
export const postRegister = async (req, res) => {
  try {
    const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);

    const newUser = await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      eMail: req.body.eMail,
      password: hashedSaltyPassword,
    });
   // console.log(newUser);
    addALearningDesk(newUser._id);
    res.send(newUser);
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
};

/**
 * @param {express.Response} res
 * @param {express.Request} req
 */

export const postLogIn = async (req, res) => {
  const loggingUser = await userModel.findOne({ eMail: req.body.eMail });
  //console.log(req.body)
  if (!loggingUser) {
    //console.log("eMail")
    return res.send({ error: "eMail/Password combination not found" });
  }
  const isRightPwd = await bcrypt.compare(
    req.body.password,
    loggingUser.password

  ); // gibt true oder false zurück

  if (!isRightPwd) {
    //console.log("password")
    return res.send({ error: "eMail/Password combination not found" });
  }

  // User hat sich erfolgreich eingeloggt => erstelle JWT
  const expiresInSec = 1 * 60 * 60 * 24; // 1 h * 24 => 24h
  const token = jwt.sign(
    {
      /*  userName: loggingUser.name, */
      eMail: loggingUser.eMail,
      userId: loggingUser._id,
      learningDesk: loggingUser.myLearningDesk
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: expiresInSec,
    }
  );

  return res.send({ msg: "successfully logged in", jwt: token });
};

export const postLogOut = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("isLogged");
  return res.status(200).json({ msg: "You are successfully logged out" });
};
