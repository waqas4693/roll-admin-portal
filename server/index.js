import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import { MongoClient } from 'mongodb';


import rollRoutes from './routes/roll.js'
import authRoutes from './routes/authRoutes.js'
import adminLogin from './routes/adminLogin.js'

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
  const result = await Roll.findById('663e1331819ad528e18878b8')

    console.log('Roll Records Node Js:')
    console.log(result)
  res.json('Server Running')
})
app.use('/api/auth', authRoutes)
app.use('/api/roll', rollRoutes)
app.use('/api/adminLogin', adminLogin)

// import { MongoClient, ServerApiVersion } from 'mongodb'
// const uri =
//   'mongodb+srv://waqas:waqas123456@cluster0.9qqkzja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// })

// async function run () {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db('test').command({ ping: 1 })
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     )
//   } catch (e) {
//     console.log('Mongo Error = ')
//     console.log(e)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)

mongoose
// .connect('mongodb://waqas4693:jq5wJ3C6YFF16Amu@cluster0.9qqkzja.mongodb.net/edu_supplements', {
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch(error => console.log(`${error} did not connect`))


const uri = 'mongodb+srv://waqas4693:jq5wJ3C6YFF16Amu@cluster0.c4givi4.mongodb.net/edu_supplements?retryWrites=true&w=majority&appName=Cluster0';

async function connectToMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Perform operations using the client object
    const database = client.db('edu_supplements');
    const collection = database.collection('rolls');

    // Example: Insert document
    const result = await collection.insertOne({ key: 'size' });
    console.log(`Inserted ${result.insertedCount} document`);

    // Example: Find documents
    const documents = await collection.find({}).toArray();
    console.log('Found documents:', documents);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  } finally {
    // Close the MongoDB Atlas connection
    // await client.close();
    // console.log('Disconnected from MongoDB Atlas');
  }
}

// connectToMongoDB()

export default app
