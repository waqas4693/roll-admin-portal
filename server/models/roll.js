import mongoose from 'mongoose'

const rollSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  session: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  sizeWidth: {
    type: String
  },
  sizeHeight: {
    type: String
  },
  loomNo: {
    type: String
  },
  rollNo: {
    type: String
  },
  color: {
    type: String
  },
  lamination: {
    type: String
  },
  printStatus: {
    type: String
  },
  missPrint: {
    type: String
  },
  missPick: {
    type: String
  },
  freshBags: {
    type: String
  },
  totalBags: {
    type: String
  },
  weight: {
    type: String
  },
  bopp: {
    type: String
  },
  rollToRoll: {
    type: String
  },
  laminationDamage: {
    type: String
  }
})

const Roll = mongoose.model('Roll', rollSchema)

export default Roll
