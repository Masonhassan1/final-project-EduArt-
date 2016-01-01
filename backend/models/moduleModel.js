import mongoose from "mongoose";
import User from "./userModel.js"

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  noOfDays: {
    type: Number,
    min: 1,
    max: 25,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "online",
      "onsite",
      "lecture",
      "mentoring",
      "exercise",
      "assignment",
    ],
    required: true,
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "",
    },
  ],
  zoomLink: {
    type: String,
    default: "",
  },
  tasks: [
    {
      taskName: {
        type: String,
        default: "",
      },
      taskLink: {
        type: String,
        default: "",
      },
    },
  ],
  extraMaterial: [
    {
      description: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
  ],
});

moduleSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  console.debug("updateOne aufgerufen");
  next(); // ohne next würde save() niemals ausgeführt werden
});

export default mongoose.model("Module", moduleSchema);