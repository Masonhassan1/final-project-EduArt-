import ModuleModel from "../models/moduleModel.js";

export const addModule = async (req, res) => {
  try {
    const newModule = new ModuleModel(req.body);
    await newModule.save(); // speichert newModule in Datenbank

    res.json({ msg: "Der Kurs wurde in das Angebot eingebaut", newModule });
  } catch (error) {
    res.send(error.message);
  }
};

export const findModule = async (req, res) => {
  const shallPopulate = req.query.populate;
  const moduleId = req.params.id;

  try {
    let module;

    if (shallPopulate === "true") {
      // wir erhalten vom Client String => daher true in Anführungsstrichen
      course = await ModuleModel
        .findById(moduleId)
        .populate("teacher")
    } else {
      course = await ModuleModel
        .findById(moduleId)
        .populate("teacher");
    }
    res.json(module);
  } catch (error) {
    res.send(error.message);
  }
};

export const allModules = async (req, res) => {
  const searchParam = req.query.name;
  try {
    let allModules;
    if (searchParam) {
      allModules = await ModuleModel
      .find({
        name: {
          $regex: `${searchParam}`,
          $options: "i",
        },
      })
      .populate("teacher");
      res.send(allModules);
    } else {
      allModules = await ModuleModel
      .find({})
      .populate("teacher");
      res.send(allModules);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateModules = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const module = await ModuleModel
    .findOneAndUpdate({_id:moduleId }, req.body, {
      new: true,
    })
    .populate("teacher");
    res.json(module);
  } catch (error) {
    res.send(error.message);
  }
};

export const deleteModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const mongoResponse = await ModuleModel.deleteOne({ _id: moduleId });

    res.send(mongoResponse);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ error: e.message });
  }
};
