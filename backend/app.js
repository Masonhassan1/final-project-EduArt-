import express from "express";
import connectMongoose from "./util/mongooseConnect.js";
import { unkownHandler, errorHandler } from "./middleware/middelware.js";
import homeRouter from "./routes/indexRouter.js";
import userRouter from "./routes/userRouter.js";
import myLearningDeskRouter from "./routes/myLearningDeskRouter.js";
import myPurchaseRouter from "./routes/myPurchaseRouter.js";
import myCertificatRouter from "./routes/myCertificatRouter.js";
import shareRouter from "./routes/shareRouter.js"
//import myClass from "./routes/myClassRouter.js";
//import fileRouter from "./routes/fileRouter.js";
//import pdfRouter from "./routes/pdfRouter.js"
import courseRouter from "./routes/courseRouter.js";
import moduleRouter from "./routes/moduleRouter.js";
import authyRouter from "./routes/authyRoutes.js";
import imagesUpload from "./routes/imagesRouter.js"
import path from "node:path";
import { fileURLToPath } from "node:url";
import serveIndex from "serve-index";
import cors from "cors";
import "dotenv/config.js";
import expressFileUpload from "express-fileupload";

const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(expressFileUpload({createParentPath: true,}));

/* app.post("/images", (req, res) => {
  const image = req.files.image;
  image.mv(`./public/images/${image.name}`);
  console.log(image);
  res.status(201).send();
}); */
app.use("/images", imagesUpload)
app.use("/", homeRouter);
app.use("/", authyRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use("/mylearningdesk", myLearningDeskRouter);
app.use("/mypurchases", myPurchaseRouter);
app.use("/mycertificat", myCertificatRouter);
app.use("/courses", courseRouter);
app.use("/modules", moduleRouter);
app.use("/shareplattform",shareRouter)
//app.use("/createpdf", pdfRouter);
//app.use("/myClass", myClassRouter);
//app.use("fileUpload/", fileRouter);
app.use("/public/images", serveIndex(path.join(__dirname, "public/images")));
app.use("/public/invoices", serveIndex(path.join(__dirname, "public/invoices")));
app.use("/public/certifictates", serveIndex(path.join(__dirname, "public/certificates")));
app.use(unkownHandler);
app.use(errorHandler);

if (await connectMongoose()) {
  app.listen(port, () => {
    console.log("listening to port ", port);
  });
}
