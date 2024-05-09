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
app.get('/', function (res) {
  res.json('Server Running')
})
app.use('/api/auth', authRoutes)
app.use('/api/roll', rollRoutes)
app.use('/api/adminLogin', adminLogin)

app.use('/audios', express.static('audios'))

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)
mongoose
    // .connect(
    // 'mongodb+srv://waqas4693:jq5wJ3C6YFF16Amu@cluster0.c4givi4.mongodb.net/edu_supplements?retryWrites=true&w=majority',
    // {
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch(error => console.log(`${error} did not connect`))

export default app