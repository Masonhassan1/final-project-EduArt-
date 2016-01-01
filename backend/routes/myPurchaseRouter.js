import express, { Router } from "express";
import {
  addAPurchase,
  allPurchases,
  updatePurchase,
  findPurchase
} from "../controller/purchaseController.js";
//import { addCourseOnDesk } from "../middleware/addCourseOnDesk.js"

const router = express.Router();
router.route("/")
  .get(allPurchases)
  .post(addAPurchase/* ,  addCourseOnDesk */);

router.route("/:id")
  .get(findPurchase)
    
export default router;
