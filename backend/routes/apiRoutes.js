import express from "express";
import { postMyAccount } from "../controller/apiController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/myAccount", isAuth, postMyAccount);

export default router;
