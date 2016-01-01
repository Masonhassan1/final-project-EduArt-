import express from "express";
import jwt from "jsonwebtoken";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export default async (req, res, next) => {
  // req.headers.authorization hat das format: "bearer JWT". 
  // => mittels split nur JWT "herausnehmen" 
  const passedToken = req.headers?.authorization?.split(" ")[1]; // ".?" optional chaining operator 
  
  try {
    const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET);
    // alternativ kann man jwt.verify auch eine Callback function mitgeben,
    // in der man Error Handling betreiben kann (try catch wäre somit nicht notwendig)
    
    req.eMail = decodedToken.eMail;
    req.userId = decodedToken.userId;

    return next()
  } catch(error) {
    console.log("JWT verification error:", error.message)
    res.sendStatus(401); // "Unauthorized"
  }
}