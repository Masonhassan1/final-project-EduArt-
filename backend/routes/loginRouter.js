import express, { Router } from "express";
import { postLogin } from "../controller/authyController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

/* router.route("/") */
//.delete( deleteAllUser)

router.route("/:id")
   .post(postLogin)
   .delete(isAuth, deleteUser);

export default router;
