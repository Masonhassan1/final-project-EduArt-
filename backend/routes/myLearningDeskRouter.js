import express, { Router } from "express";
import {
  addALearningDesk,
  addACourseOnDesk,
  findALearningDesk,
  deleteALearningDesk,
  updateALearningDesk,
  listAllLearningDesks,
} from "../controller/myLearningDeskController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.route("/")
  .get(/* isAuth, */listAllLearningDesks)
  .post(/* isAuth, */addALearningDesk);

router.route("/:id")
  .get(/* isAuth, */ findALearningDesk)
  .patch( /* isAuth, */ addACourseOnDesk)
  .delete(isAuth, deleteALearningDesk);

router.route("/addacourseonmylearningdesk/:id")
  .patch(/* isAuth, */ addACourseOnDesk);
export default router;
