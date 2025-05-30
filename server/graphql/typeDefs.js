import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
    ingredients: [Ingredient]
    ingredient(_id: ID!): Ingredient
  }

  type Mutation {
    createRecipe(name: String, instructions: String): Recipe
    createIngredient(
      name: String
      quantity: Int
      unit: String
      recipeId: ID
    ): Ingredient
    deleteRecipe(_id: ID!): Recipe
    deleteIngredient(_id: ID!): Ingredient
    updateRecipe(_id: ID!, name: String, instructions: String): Recipe
    updateIngredient(
      _id: ID!
      name: String
      quantity: Int
      unit: String
    ): Ingredient
  }

  type Recipe {
    _id: ID
    name: String
    instructions: String
    createdAt: String
    updateAt: String
    ingredients: [Ingredient]
  }

  type Ingredient {
    _id: ID
    name: String
    quantity: Int
    unit: String
    recipeId: ID
    createdAt: String
    updateAt: String
    recipe: Recipe
  }
`;
