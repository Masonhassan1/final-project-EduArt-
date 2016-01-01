import express, { Router } from "express";
import {
  addACertificat,
  findACertificat
} from "../controller/certificatController.js";
//import { addCourseOnDesk } from "../middleware/addCourseOnDesk.js"

const router = express.Router();
router.route("/")
  .post(addACertificat);

router.route("/:id")
  .get(findACertificat)
    
export default router;
