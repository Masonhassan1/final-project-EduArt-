import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    default: ""
  },
  fileType: {
    type: String,
    default: "",
    enum: ["image", "pdf", "doc", ""]
  },
  dateOfUpload: {
    type: Date,
    default: new Date
  },
  updatedAt: {
    type: Date,
    default: ""
  }
});
// MONGOOSE MIDDLEWARE (pre hook)
fileSchema.pre(['save'], function(next) {
  // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() ausgeführt
  this.updatedAt = new Date();
  next(); // jetzt wird save aufgerufen
})


fileSchema.pre(['findOneAndUpdate', 'updateFile'], function(next){
  // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
  // und updateOne() ausgeführt
  //console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
  this.set({ updatedAt: new Date() }); 
  next(); // ohne next würde save() niemals ausgeführt werden
} );


const FileModel = mongoose.model("Files", fileSchema);
export default FileModel;


