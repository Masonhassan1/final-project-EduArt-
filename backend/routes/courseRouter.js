import express, { Router } from "express";
import {
  addCourse,
  allCourses,
  updateCourse,
  findCourse,
  deleteCourse,
  addModuleOnACourse,
  deleteAModulefromACourse
} from "../controller/courseController.js";

const router = express.Router();
router.route("/")
  .get(allCourses)
  .post(addCourse);

router.route("/:id")
  .get(findCourse)
  .delete(deleteCourse)
  .patch(/* isAuth, */ updateCourse);
  
router.route("/addmoduleonacourse/:id")
  .patch(addModuleOnACourse)
 
  router.route("/deletemodulefromacourse/:id")
  .patch(deleteAModulefromACourse)

  

export default router;
