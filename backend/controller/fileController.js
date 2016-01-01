import LearningDeskModel from "../models/learningDeskModel.js";
import FileModel from "../models/fileModel.js";
import UserModel from "../models/userModel.js";
import { ChangedEvent } from "gojs";

export const addUserImageToUser = async (req, res/* , useMyId */) => {
  try {
    const newFile = new FileModel();
    await newFile.save(); 

    const userId = req.body.id;
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$set:{userImage: newFile._id}}
      )
    res
      .status(201)
      .json({ msg: "Das Bild wurde hochgeladen und gespeichert", newFile});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const findFile = async (req, res) => {
  const fileId = req.params.id;
  //const fileId = req.params.fileName; //sinnvoller??

  try {
    let fileToBeFound;
    fileToBeFound = await FileModel
      .findById(fileId)

    res.json(fileToBeFound);
  } catch (error) {
    res.send(error.message);
  }
};


export const updateFile = async (req, res) => {
  const fileId = req.params.id;
  //const learningDeskFileName= req.params.fileName;// Besser?
  try {
    const foundFile = await FileModel
    .findOneAndUpdate(
      {_id:fileId},
      {
        /* {<element to be Changed>:req.body.courseId
        } */
      },
      {new: true}
    )
    res.json(learningDesk);
  } catch (error) {
    res.send(error.message);
  }
};

