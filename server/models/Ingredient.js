import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  quantity: {
    type: Number
  },
  unit: {
    type: String
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    require: true
  }
}, {
  timestamps: true
})

export default mongoose.model("Ingredient", IngredientSchema)