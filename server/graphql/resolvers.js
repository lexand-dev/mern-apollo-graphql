import Recipe from "../models/Recipe.js";
import Ingredient from "../models/Ingredient.js";

export const resolvers = {
  Query: {
    hello: () => "Hellow world",
    recipes: async () => await Recipe.find(),
    recipe: async (_, args) => await Recipe.findById(args._id),
    ingredients: async () => await Ingredient.find(),
    ingredient: async (_, args) => await Ingredient.findById(args._id)
  },
  Mutation: {
    createRecipe: async (_, args) => {
      console.log(args);
      const recipe = new Recipe({
        name: args.name,
        instructions: args.instructions
      });

      const savedRecipe = await recipe.save();
      return savedRecipe;
    },
    createIngredient: async (_, args) => {
      const recipeFound = await Recipe.findById(args.recipeId);
      if (!recipeFound) {
        throw new Error("Recipe not found");
      }

      const ingredient = new Ingredient({
        name: args.name,
        quantity: args.quantity,
        unit: args.unit,
        recipeId: args.recipeId
      });

      const savedIngredient = await ingredient.save();
      return savedIngredient;
    },
    deleteRecipe: async (_, args) => {
      const recipe = await Recipe.findByIdAndDelete(args._id);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      //delete all ingredients associated with this recipe
      await Ingredient.deleteMany({ recipeId: args._id });
      return recipe;
    },
    deleteIngredient: async (_, args) => {
      const ingredient = await Ingredient.findByIdAndDelete(args._id);
      if (!ingredient) {
        throw new Error("Ingredient not found");
      }
      return ingredient;
    },
    updateRecipe: async (_, args) => {
      const recipe = await Recipe.findByIdAndUpdate(
        args._id,
        {
          name: args.name,
          instructions: args.instructions
        },
        { new: true }
      );
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      return recipe;
    },
    updateIngredient: async (_, args) => {
      const ingredient = await Ingredient.findByIdAndUpdate(
        args._id,
        {
          name: args.name,
          quantity: args.quantity,
          unit: args.unit
        },
        { new: true }
      );
      if (!ingredient) {
        throw new Error("Ingredient not found");
      }
      return ingredient;
    }
  },
  Recipe: {
    ingredients: async (parent) => {
      return await Ingredient.find({ recipeId: parent._id });
    }
  },
  Ingredient: {
    recipe: async (parent) => {
      return await Recipe.findById(parent.recipeId);
    }
  }
};
