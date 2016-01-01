import express from "express";
import CertificatModel from "../models/certificateModel.js";
import UserModel from "../models/userModel.js";


export const addACertificat = async (req, res) => { 
  try {
    const newCertificat = new CertificatModel(
      { 
        managedCourse:req.body.courseId, 
        assessmentsPointsAchieved: req.body.assessmentsPointsAchieved
      },
     ); 
    await newCertificat.save();
    
    //Certificat dem User zuordnen
    const userId = req.body.userID
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$push:{myCertificats: newCertificat._id}}
      )
      .populate("myCertificats")

    res.json({ msg: "Das Certificate wurde abgelegt",  user, newCertificat });
  } catch (error) {
    res.send(error.message);
  }
};


export const findACertificat = async (req, res) => {
  const certificatId = req.params.id;
  try {
    let certificat;
    certificat = await CertificatModel
    .findById(certificatId)
    res.json(certificat);
  } catch (error) {
    res.send(error.message);
  }
};
