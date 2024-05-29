import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName: {
    type: String
  },
  dob: {
    type: String
  },
  cellNo: {
    type: String
  },
  passportNo: {
    type: String
  },
  passportStart: {
    type: Date
  },
  passportExpiry: {
    type: Date
  },
  aqamaID: {
    type: String
  },
  aqamaStart: {
    type: Date
  },
  aqamaExpiry: {
    type: Date
  },
  nationality: {
    type: String
  },
  bankAccountNo: {
    type: String
  },
  visaStatus: {
    type: String
  },
  workingDepartment: {
    type: String
  },
  employeeJoiningDate: {
    type: Date
  },
  employeeResigningDate: {
    type: Date
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

const employee = mongoose.model('employee', employeeSchema)
export default employee