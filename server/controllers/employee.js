import employee from '../models/employee.js'

export const saveEmployee = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      dob,
      cellNo,
      passportNo,
      passportStart,
      passportExpiry,
      aqamaID,
      aqamaStart,
      aqamaExpiry,
      nationality,
      bankAccountNo,
      visaStatus,
      workingDepartment,
      employeeJoiningDate,
      employeeResigningDate
    } = req.body

    const newEmployee = new employee({
      name,
      fatherName,
      dob,
      cellNo,
      passportNo,
      passportStart,
      passportExpiry,
      aqamaID,
      aqamaStart,
      aqamaExpiry,
      nationality,
      bankAccountNo,
      visaStatus,
      workingDepartment,
      employeeJoiningDate,
      employeeResigningDate
    })

    await newEmployee.save()
    res.status(200).send('Employee data saved successfully')
  } catch (error) {
    res.status(500).send('Error saving employee: ' + error.message)
  }
}

// Function to get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employee.find().select('_id name')
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).send('Error fetching employees: ' + error.message)
  }
}
