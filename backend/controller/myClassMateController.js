import  UserModel from "../models/userModel.js";

export const addALearningDesk = async (req, res) => {
  try {
    const newLearningDesk = new LearningDeskModel(req.body);
    await newLearningDesk.save(); 
    res
      .status(201)
      .json({ msg: "Ihr Schreibtisch wurde eingerichtet", newLearningDesk });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const findAClassMate = async (req, res) => {
  const classMateId = req.params.id;

  try {
    let myClassMate;
    myClassMate = await UserModel
      .findById(classMateId)
    res.json(myClassMate);
  } catch (error) {
    res.send(error.message);
  }
};

export const myClassMates = async (req, res) => {
  const searchParam = req.query.name;
  try {
    let allClassMates;
    if (searchParam) {
      allClassMates = await UserModel
        .find({
          /* classMates: {
            $regex: `${searchParam}`,
            $options: "i",
          }, */
        })
      res.send(allClassMates);
    } else {
      allClassMates = await UserModel
        .find({})
      res.send(allClassMates);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const addAClassMate = async (req, res) => {
  const classId = req.params.id;
  try {
    const classMates = await ClassModel
    .findOneAndUpdate(
      {_id:classId},
      {
        $push:{coursesBooked:{
          courseId:req.body.courseId/* ,
          statusOfCourseDuration:req.body.statusOfCourseDuration,
          numberOfModulesFinished:req.body.numberOfModulesFinished */
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

export const deleteALearningDesk = async (req, res) => {
  const learningDeskId = req.params.id;
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
