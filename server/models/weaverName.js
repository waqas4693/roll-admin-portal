import mongoose from 'mongoose'
const { Schema } = mongoose;

const weaverNameSchema = new mongoose.Schema({
  rollId: {
    type: Schema.Types.ObjectId,
    ref: 'roll'
  },
  missPrint: String,
  missPick: String,
  freshBag: String,
  weight: String
});

const weaverName = mongoose.model('weaverName', weaverNameSchema);
export default weaverName