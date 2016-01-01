import express from "express";
import { Router } from "express"
import getHome  from "../controller/indexController.js";


const homeRouter = Router();

homeRouter.get('home', getHome)
homeRouter.get('', getHome)
homeRouter.get('index', getHome)

export default homeRouter