import express from "express";
import PurchaseModel from "../models/purchasesModel.js";
/* import UserModel from "../models/userModel.js";
import LearningDeskModel from "../models/learningDeskModel.js"; */
import renderPDF from "../middleware/pdfHandlerReact.js"
import { addAPurchaseToAUser } from "../middleware/addAPurchaseToAUser.js";
import { addACourseOnADesk } from "../middleware/addACourseOnADesk.js"

// addAPurchase: Rechnugsgdatensatz erstellt
export const addAPurchase = async (req, res) => { 
  try {
    const newPurchase = new PurchaseModel({purchasedCourse:req.body.courseId}); 
    if (req.body.base) {
      newPurchase.invoiceNumber = req.body.base
    } else {
      const invoicesSorted = await PurchaseModel
      .find()
      .sort("-invoiceNumber")
      .populate("purchasedCourse");
      if (invoicesSorted) {
         newPurchase.invoiceNumber = invoicesSorted[0].invoiceNumber+1
      } else {
        newPurchase.invoiceNumber = 0
      }
    } 
    await newPurchase.save();
    
    //Purchase dem User zuordnen
    const purchaseId=newPurchase._id
    const userId = req.body.userID
    await addAPurchaseToAUser(purchaseId, userId)
        
    // Course auf dem Schreibtisch ablegen
    const myAddedCourse = req.body.courseId
    const myDeskID = req.body.deskId
    await addACourseOnADesk (myAddedCourse,myDeskID)

    // RechnungsPDF generieren und dem Purchase zuordnen
    await renderPDF(userId, purchaseId)  

    res.json( newPurchase, learningDesk );
  } catch (error) {
    res.send(error.message);
  }
};


export const findPurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    let purchase;
    purchase = await PurchaseModel
    .findById(purchaseId)
    .populate("purchasedCourse")
    res.json(purchase);
  } catch (error) {
    res.send(error.message);
  }
};

export const allPurchases = async (req, res) => {
  const searchParam = req.query.noOfInvoice;
  try {
    let allPurachases;
    if (searchParam) {
      allPurachases = await PurchaseModel.find({
        allPurachases: {
          $regex: `${searchParam}`,
          $options: "i",
        },
      })
        .populate("purchasedCourse")
      res.send(allPurchases);
    } else {
      allPurchases = await PurchaseModel.find({})
      .populate("purchasedCourse")
      res.send(allPurchases);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updatePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const purchase = await PurchaseModel
    .findOneAndUpdate({ _id: purchaseId },
      // element to be changed
      { new: true }
    );

    res.json(purchase);
  } catch (error) {
    res.send(error.message);
  }
};