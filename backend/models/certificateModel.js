import mongoose from "mongoose";
import Course from "./courseModel.js";
//import AutoIncrementSimple from "@typegoose/auto-increment"

const CertificatSchema = new mongoose.Schema( {
  //_id: {type: String, required: true},
  
  managedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
    unique: false,
  },
  dateOfCertificat: {
    type: Date,
    immutable: true,
    default: () => new Date()
  },
  assessmentsPointsAchieved: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  renderedPDF: {
    type:String,
    default: ""
  },
});

/* PurchaseSchema.plugin(AutoIncrementSimple, [{ field: 'invoiceCounter' }]);
const doc = await PurchaseModel.create({ invoiceCounter: 10 });
await doc.save(); // somefield will be 11 */

const CertificatModel = mongoose.model('certificat', CertificatSchema);


export default CertificatModel