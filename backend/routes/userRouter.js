import express, { Router } from "express";
import { addALearningDesk } from "../controller/myLearningDeskController.js";
import {
  //addUser,
  userList,
  updateUser,
  findUser,
  deleteUser,
  deactivateUser,
  updateUserImage
} from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js"

const router = express.Router();

router.route("/")
  .get(/* isAuth,  */userList)
//.delete(deleteAllUser)

router.route("/:id")
  .get(/* isAuth,  */findUser)
  .delete(/* isAuth, */ deleteUser)
  .patch(/* isAuth, */ updateUser)

router.route("/updateimage/:id")
  .patch(/* isAuth, */ updateUserImage)

router.route("/deactivateUser/:id")
  .patch(/* isAuth, */ deactivateUser)

export default router;
