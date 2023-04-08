import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema({
  name: String,
  description: String,
  createdAt: String,
  thumbsUp: Number,
  thumbsDown: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
