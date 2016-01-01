import mongoose from "mongoose";
import Course from "./courseModel.js";
//import AutoIncrementSimple from "@typegoose/auto-increment"

const PurchaseSchema = new mongoose.Schema( {
  //_id: {type: String, required: true},
  invoiceNumber: { 
    type: Number, 
    default: 0,
    unique: true
   },
  //invoiceCounter: { type: Number, default: 0 },
  base: {type: Number},
  purchasedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
    unique: false,
  },
  dateOfInvoice: {
    type: Date,
    immutable: true,
    default: () => new Date()
  },
  renderedPDF: {
    type:String,
    default: ""
  }
});

/* PurchaseSchema.plugin(AutoIncrementSimple, [{ field: 'invoiceCounter' }]);
const doc = await PurchaseModel.create({ invoiceCounter: 10 });
await doc.save(); // somefield will be 11 */

const PurchaseModel = mongoose.model('purchase', PurchaseSchema);


export default PurchaseModel