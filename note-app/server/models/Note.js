import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true }, // 'text' field is required
});

export default mongoose.model('Note', noteSchema); // exports the model 'Note'
