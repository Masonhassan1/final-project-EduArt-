import express, { Router } from "express";
import isAuth from "../middleware/isAuth.js"


const router = express.Router();

router.route("/")
.post((req, res) => {
  const image = req.files.image;
  image.mv(`./public/images/${image.name}`);
  console.log(image);
  res.status(201).send();
}); 
  
export default router;
