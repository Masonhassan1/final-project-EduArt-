import pdfkit from "pdfkit";
import React from "react";
import UserModel from "../models/userModel.js"
import PurchaseModel from "../models/purchasesModel.js";
import { Page, Text, View, Document, Image, Line, 
        Svg, StyleSheet, Font, renderToFile } from "@react-pdf/renderer";
Font.register({
  family: "FoundrySansMd",
  src: "./public/fonts/Foundry/FOUSANMD.otf",
});


//const invName = req.body.invoiceNo
let invName = "";
let invoiceNo = 0;
let clientNo = "653247";
//const courseName = req.body.courseName
let clientName = "";
let address = "EduArt gGmbH, Diese Straße 20, 33330 Gütersloh";
let clientAddress = "";
let clientCity = "";
let date = new Date();
let dateOfInvoices = date.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});
let courseBooked = "";
let coursePrice="";
let startDate = date.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});


const styles = StyleSheet.create({
  page: {
    size: "A4",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "start",
    backgroundColor: "rgb(230, 245, 245)",
    //backgroundColor: "linear-gradient(#e66465, #9198e5)",
    fontFamily: "FoundrySansMd",
    fontSize: "10px",
  },
  /* section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  }, */
  logo: {
    width: 100,
    top: 10,
    left:50,
  },
  addressHeader: {
    //backgroundColor: "white",
    width: 200,
    maxHeight: 20,
    padding: 0,
    position: "fixed",
    top: -20,
    left: 350,
    fontSize: "10px",
  },
  addressHeaderText: {
    fontSize: "8px",
    width: 300,
  },
  addressArrayClient: {
    backgroundColor: "white",
    width: 200,
    maxHeight: 100,
    padding: "10px",
    marginLeft: 0,
    position: "fixed",
    top: 100,
    left: 50,
    fontSize: "10px",
    border: "none",
    corderColor: "black",
    borderStyle: "solid",
  },
  addressArraySenderText: {
    fontSize: "6px",
    marginBottom: 10,
  },
  addressArrayClientText: {
    width: 130,
    fontSize: "10px",
  },
  invoiceMains: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "left",
    padding: 10,
    width: 200,
    height: "auto",
    maxHeight: 100,
    position: "absolute",
    top: 275,
    left: 40,
   // border: "1 solid black"
  },
  invoiceMainsText: {
    top: 0,
    left: 0,
    color: "black",
    width: "80%",
    border: "solid black",
    fontSize: "10px"
  },
  svgFirstLine: {
    backgroundColor: "white",
    width: 500,
    height: 0,
    top: 200,
    left: 50,
    borderWidth: 0.5,
    borderColor: "black",
    borderStyle: "solid",
  },
  firstLine: {
    x1: 1,
    y1: 0,
    x2: 500,
    y2: 1,
    strokeWidth: 1,
    stroke: "rgb(0,0,0)",
  },

  invoiceDetails: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "left",
    backgroundColor: "white",
    width: 500,
    height: "auto",
    maxHeight: 100,
    top: 200,
    left:50,
    border: "solid"
  },
  invoiceDetailsText: {
    top: 0,
    left: 0,
    color: "black",
    width: "30%",
    height: "100%",
    border: "solid black",
    fontSize: "12px"
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "spaceAround",
    padding: 10,
    paddingLeft: 50,
    backgroundColor: "white",
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: 0,
    left:0,
    borderTop: "solid black 1pt"
  },
  footerText: {
    color: "black",
    width: "30%",
    border: "solid black",
    fontSize: "8px",
    marginRight: 20,
  },
});

const createPDF = () =>
/*#__PURE__*/ React.createElement(
  Document,
  null,
  /*#__PURE__*/ React.createElement(
    Page,
    { style: styles.page,},

    /*#__PURE__*/ React.createElement(
      Image,
      {style: styles.logo, src: "./public/images/logo.png"},
    ),

    /*#__PURE__*/ React.createElement(
      View,
      { style: styles.addressHeader,},
      /*#__PURE__*/ React.createElement(
        Text,
        {style: styles.addressHeaderText,},
        address
        )
    ),

    /*#__PURE__*/ React.createElement(
      View,
      { style: styles.addressArrayClient },
      /*#__PURE__*/ React.createElement(
        Text,
    { style: styles.addressArraySenderText },
    address
    ),
    /*#__PURE__*/ React.createElement(
      Text,
      { style: styles.addressArrayClientText, },
      clientName
    ),
    /*#__PURE__*/ React.createElement(
      Text,
      {style: styles.addressArrayClientText,},
      clientAddress
    ),
    /*#__PURE__*/ React.createElement(
      Text,
      {style: styles.addressElementsClient,},
      clientCity
    )
    ),
        
    /*#__PURE__*/ React.createElement(
      View,
      { style: styles.invoiceMains },
        /*#__PURE__*/ React.createElement(
          Text,
          {style: styles.invoiceMainsText},
          `invoice date: ${dateOfInvoices}`,
        ),
        /*#__PURE__*/ React.createElement(
          Text,
          {style: styles.invoiceMainsText},
          `invoiceNo: ${invoiceNo}`,
        ),
        /*#__PURE__*/ React.createElement(
          Text,
          {style: styles.invoiceMainsText},
          `clientNo: ${clientNo}`,
        ),
    ),
          
          
    /*#__PURE__*/ React.createElement(
      Svg,
      {style: styles.svgFirstLine,},
      /*#__PURE__*/ React.createElement(
        Line,
        {style: styles.firstLine,},
        clientName
      )
    ),



    /*#__PURE__*/ React.createElement(
      View,
      { style: styles.invoiceDetails },
      /*#__PURE__*/ React.createElement(
        Text,
        {style: styles.invoiceDetailsText},
        `itemNo:
        1`
      ),
      /*#__PURE__*/ React.createElement(
        Text,
        {style: styles.invoiceDetailsText},
        `Course booked
        ${courseBooked}`
      ),
      /*#__PURE__*/ React.createElement(
        Text,
        {style: styles.invoiceDetailsText},
        `date of start
        ${startDate}`
      ),
      /*#__PURE__*/ React.createElement(
        Text,
        {style: styles.invoiceDetailsText},
        `course price
        ${coursePrice}€`
      ),
    ),


      /*#__PURE__*/ React.createElement(
        View,
        { style: styles.footer },
          /*#__PURE__*/ React.createElement(
            Text,
            {style: styles.footerText},
            "bank account: IBAN DE49 1234 5678 91011 12"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {style: styles.footerText},
            "e-mail: info@EduArt.com"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {style: styles.footerText},
            "Project-Team: Oxana Danilova, Mercedes Girmanová, Luay Abbas, Joachim Ritter"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {style: styles.footerText},
            "St-No 351/5925/0524"
          ),
          /*#__PURE__*/ React.createElement(
            Text,
            {style: styles.footerText},
            "UStID DE812782498"
          ),
      ),
    )
  );


const getData = async (userId, purchaseId,) => {
  const userID = userId

  let data;
    data = await UserModel
      .findById(userID)
      .populate({
        path: "myPurchases",
          populate: {
            path:"purchasedCourse"
          }
      })
      clientName = data.firstName +" "+ data.lastName
      clientAddress = data.street +" "+ data.houseNumberDetail 
      clientCity= data.city.code +" "+ data.city.name
      invName = data.firstName +  data.lastName + "_"+ data.myPurchases.filter(purchase=>purchase._id.toString() === purchaseId.toString()).map(purchase=>purchase.invoiceNumber).join();
      invoiceNo = data.myPurchases.filter(purchase=>purchase._id.toString() === purchaseId.toString()).map(purchase=>purchase.invoiceNumber).join();
      courseBooked = data.myPurchases.filter(purchase=>purchase._id.toString() === purchaseId.toString()).map(purchase=>purchase.purchasedCourse.courseName).join(); 
      coursePrice = data.myPurchases.filter(purchase=>purchase._id.toString() === purchaseId.toString()).map(purchase=>purchase.purchasedCourse.coursePrice).join();
      startDate = data.myPurchases.filter(purchase=>purchase._id.toString() === purchaseId.toString()).map(purchase=>purchase.purchasedCourse.dateOfStart.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })).join(); 
     
}; 


const addPDFToPurchases = async (pathToPDF, purchaseId, ) => {
  const purchaseID = purchaseId

  const purchase = await PurchaseModel
  .findOneAndUpdate(
    {_id:purchaseID},
    {renderedPDF: pathToPDF},
    {new: true}
    )
}

export const renderPDF = async (userId, purchaseId, /* req, */) => {
  await getData(userId, purchaseId)//(req.body)
  const pathToPDF = `./public/invoices/${invName}.pdf`
  try {

    await renderToFile(
      /*#__PURE__*/ React.createElement(createPDF, null),
      pathToPDF
      );
      console.log("pdf gespeichert in: ", pathToPDF)
    } catch (err) {
      console.error(err);
    }
  await addPDFToPurchases (pathToPDF, purchaseId)
  
}

export default renderPDF;


