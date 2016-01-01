import mongoose from "mongoose";
import User from "../models/userModel.js"

const shareSchema = mongoose.Schema({
  chatter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    default: "",
    max: 500
  },
  postedOn: {
    type: Date,
    immutable: true, // Wert ist nach Erstellung nicht mhr änderbar
    default: () => new Date() // wenn wir das Document erzeugen, wird Date gesetzt
  },
  attachment: [{
    type: String,
    default: ""
  }],
  visible:{
    type: Boolean, //
    default:true,
  },
    code:{
      type:Boolean,
      default:false
    },
    color:{
      type:String,
      default:""
    },
    like:{
      type:Number,
      default:0
    },
    disLike:{
      type:Number,
      default:0
    },
    emoji:[{
      emojiType:{
        type: String,
        default:""
    },
      commenter:{
        type: String,
        default:""}
      }],
  });
  
  const ShareModel = mongoose.model("Share", shareSchema);
  export default ShareModel;
  

