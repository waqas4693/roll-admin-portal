import mongoose from 'mongoose'

const rollSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  loomNo: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  inPercentage: {
    type: String,
    required: true
  },
  lamination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bopp: {
    type: String,
    required: true
  },
  rToRMp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const roll = mongoose.model('roll', rollSchema)
export default roll