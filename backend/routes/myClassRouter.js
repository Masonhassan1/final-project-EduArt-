import express, { Router } from "express";
import {
  myClassMates, findAClassMate, addAClassmate, deleteAClassMate
} from "../controller/myClassController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.route("/")
  .get(/* isAuth, */ myClassMates)

router
  .route("/:id")
  .get(/* isAuth,  */findAClassMate)
  .patch(/*  isAuth,  */addAClassmate)
  //.patch( /* isAuth, */ updateALearningDesk )
  .delete(/* isAuth,  */deleteAClassMate);

export default router;
