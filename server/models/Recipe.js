import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    instructions: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Recipe", RecipeSchema);
