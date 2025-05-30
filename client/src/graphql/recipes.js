import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      _id
      name
      instructions
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    recipe(_id: $id) {
      _id
      name
      instructions
      ingredients {
        _id
        name
        quantity
        unit
        recipeId
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($name: String!, $instructions: String!) {
    createRecipe(name: $name, instructions: $instructions) {
      _id
      name
      instructions
    }
  }
`;

export const CREATE_INGREDIENT = gql`
  mutation CreateIngredient(
    $name: String!
    $quantity: Int!
    $unit: String!
    $recipeId: ID!
  ) {
    createIngredient(
      name: $name
      quantity: $quantity
      unit: $unit
      recipeId: $recipeId
    ) {
      _id
      name
      quantity
      unit
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(_id: $id) {
      _id
      name
      instructions
    }
  }
`;

export const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(_id: $id) {
      _id
      name
      quantity
      unit
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $name: String, $instructions: String) {
    updateRecipe(_id: $id, name: $name, instructions: $instructions) {
      _id
      name
      instructions
    }
  }
`;
export const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient(
    $id: ID!
    $name: String
    $quantity: Int
    $unit: String
  ) {
    updateIngredient(_id: $id, name: $name, quantity: $quantity, unit: $unit) {
      _id
      name
      quantity
      unit
    }
  }
`;
