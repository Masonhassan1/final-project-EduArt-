import express, { Router } from "express";
import isAuth from "../middleware/isAuth.js"
import {fileList, findFile, deleteFile, addUserImageToUser} from "../controller/fileController.js"


const router = express.Router();

router.route("/")
  .get(fileList)
  .post(function(req, res){
   }) 

router.route("/:id")
  .get(findFile)
  .delete(isAuth, deleteFile)
  .patch(updateFile)
  
export default router;
