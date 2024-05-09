import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import rollRoutes from './routes/roll.js'
import authRoutes from './routes/authRoutes.js'
import adminLogin from './routes/adminLogin.js'

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* ROUTES */

// Default route
app.get('/', function (req, res) {
  res.json('Server Running')
})
app.use('/api/auth', authRoutes)
app.use('/api/roll', rollRoutes)
app.use('/api/adminLogin', adminLogin)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)
mongoose
    .connect(
    'mongodb+srv://waqas4693:X32mwglswLXDc22C@cluster0.9qqkzja.mongodb.net/admin?retryWrites=true&w=majority&appName=Cluster0',
    {
  // .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch(error => console.log(`${error} did not connect`))

export default app