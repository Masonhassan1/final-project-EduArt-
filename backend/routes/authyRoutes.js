import { Router } from "express";
import { postRegister, postLogIn, postLogOut } from "../controller/authyController.js";
import { addALearningDesk } from "../middleware/addALearningDesk.js";

const router = new Router();

router
  .post("/register", postRegister, addALearningDesk )
  .post("/login", postLogIn )
  .post("/logOut", postLogOut)

export default router;