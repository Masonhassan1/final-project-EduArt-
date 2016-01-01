import express, { Router } from "express";
import {
  addMessage,
  //deleteMessage,
  //deleteChat,
  shareList,
  updateMessage
 } from "../controller/shareController.js";
import isAuth from "../middleware/isAuth.js"

const router = express.Router();

router.route("/")
  .post(addMessage)
  .get(shareList)
  //.patch(updateChat)

  router.route("/:id")
  .patch(updateMessage)
/*.delete( deleteMessage) */

export default router;
