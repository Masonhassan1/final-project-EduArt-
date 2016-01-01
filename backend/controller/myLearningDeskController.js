import  LearningDeskModel from "../models/learningDeskModel.js";
import UserModel from "../models/userModel.js";

export const addALearningDesk = async (req, res/* , useMyId */) => {
  try {
    const newLearningDesk = new LearningDeskModel();
    await newLearningDesk.save(); 

    const userId = req.body.id;
    //const userId = useMyId
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$set:{myLearningDesk: newLearningDesk._id}} //statt ObjectId
      )
    res
      .status(201)
      .json({ msg: "Ihr Schreibtisch wurde eingerichtet", newLearningDesk});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const findALearningDesk = async (req, res) => {
  const learningDeskId = req.params.id;

  try {
    let learningDesk;
    learningDesk = await LearningDeskModel
      .findById(learningDeskId)
      .populate({
        path: "coursesBooked.courseId",
        populate: {
          path:"modulesIncluded",
          populate: {
            path: "teacher"
          } 
        }
      })

    res.json(learningDesk);
  } catch (error) {
    res.send(error.message);
  }
};

export const listAllLearningDesks = async (req, res) => {
  const searchParam = req.query.name;
  try {
    let allLearningDesks;
    if (searchParam) {
      allLearningDesks = await LearningDeskModel
        .find({
          learningDeskName: {
            $regex: `${searchParam}`,
            $options: "i",
          },
        })
        .populate("coursesBooked.courseId");
      res.send(allLearningDesks);
    } else {
      allLearningDesks = await LearningDeskModel
        .find({})
        .populate("coursesBooked.courseId");
      res.send(allLearningDesks);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateALearningDesk = async (req, res, ldID) => {
  //const learningDeskId = req.params.id;
  const learningDeskId = ldID;
  try {
    const learningDesk = await LearningDeskModel
    .findOneAndUpdate(
      {_id:learningDeskId},
      {
        $push:{coursesBooked:{
          courseId:req.body.courseId
        }}
      },
      {
          new: true,
        }
    )
    res.json(learningDesk);
  } catch (error) {
    res.send(error.message);
  }
};

export const addACourseOnDesk = async (req, res) => {
  const learningDeskId = req.params.id;
  //const learningDeskId = ldID;
  try {
    const learningDesk = await LearningDeskModel
    .findOneAndUpdate(
      {_id:learningDeskId},
      {
        $push:{coursesBooked:{
          courseId:req.body.courseId
        }}
      },
     /*  req.body, */
      {
        new: true,
      }
    );
    res.json(learningDesk);
  } catch (error) {
    res.send(error.message);
  }
};

export const deleteALearningDesk = async (req, res, ldID) => {
  //const learningDeskId = req.params.id;
  const learningDeskId = ldID;
  try {
    const mongoResponse = await LearningDeskModel.deleteOne({
      _id: learningDeskId,
    });

    res.send(mongoResponse);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ error: e.message });
  }
};
