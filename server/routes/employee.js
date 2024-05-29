import express from 'express'
import { saveEmployee, getAllEmployees } from '../controllers/employee.js'

const router = express.Router()

router.post('/', saveEmployee)
router.get('/', getAllEmployees)

export default router
