import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import rollRoutes from './routes/roll.js'
import authRoutes from './routes/authRoutes.js'
import adminLogin from './routes/adminLogin.js'
import employeeRoutes from './routes/employee.js'

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* ROUTES */

// Default route

app.get('/', async function (req, res) {
  
  res.json('Server Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/roll', rollRoutes)
app.use('/api/adminLogin', adminLogin)
app.use('/api/employee', employeeRoutes)

mongoose.set('strictQuery', false)
await mongoose
  .connect('mongodb+srv://waqas4693:waqas4693@cluster0.qhjlygp.mongodb.net/roll_records?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5001, () => console.log(`Server Port: ${5001}`));
  })
  .catch(error => console.log(`${error} did not connect`))

export default app