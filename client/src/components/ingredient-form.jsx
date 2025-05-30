import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_INGREDIENT, GET_RECIPE } from "../graphql/recipes";

export const IngredientForm = ({ recipeId }) => {
  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
    recipeId: recipeId
  });
  const [createIngredient, { loading, error }] = useMutation(
    CREATE_INGREDIENT,
    {
      refetchQueries: [
        {
          query: GET_RECIPE,
          variables: { id: recipeId }
        },
        "GetRecipe"
      ]
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient({
      ...ingredient,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createIngredient({
      variables: {
        name: ingredient.name,
        quantity: parseInt(ingredient.quantity, 10),
        unit: ingredient.unit,
        recipeId: ingredient.recipeId
      }
    });

    setIngredient({
      name: "",
      quantity: "",
      unit: "",
      recipeId: recipeId
    });
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <label>Ingredient Name:</label>
      <input
        type="text"
        name="name"
        required
        placeholder="Write a ingredient name"
        className="border border-gray-300 rounded p-2"
        onChange={handleChange}
        value={ingredient.name}
      />

      <label>Quantity:</label>
      <input
        type="number"
        name="quantity"
        required
        placeholder="Write a quantity"
        className="border border-gray-300 rounded p-2"
        onChange={handleChange}
        value={ingredient.quantity}
      />

      <label>Unit:</label>
      <input
        type="text"
        name="unit"
        required
        placeholder="Write a unit (e.g., grams, cups)"
        className="border border-gray-300 rounded p-2"
        onChange={handleChange}
        value={ingredient.unit}
      />

      <button
        className="bg-blue-500! hover:bg-blue-400! text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={handleSubmit}
        disabled={
          !ingredient.name ||
          !ingredient.quantity ||
          !ingredient.unit ||
          loading
        }
      >
        {loading ? "Adding..." : "Add Ingredient"}
        {error && <p className="text-red-500">{error.message}</p>}
      </button>
    </form>
  );
};
