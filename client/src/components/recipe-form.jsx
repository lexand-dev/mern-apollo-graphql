import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_RECIPE, GET_RECIPES } from "../graphql/recipes";

export const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    instructions: ""
  });
  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE, {
    refetchQueries: [GET_RECIPES, "GetRecipes"]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe({
      variables: {
        name: recipe.name,
        instructions: recipe.instructions
      }
    });

    setRecipe({
      name: "",
      instructions: ""
    });
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <label>Name</label>
      <input
        type="text"
        name="name"
        required
        placeholder="write a recipe name"
        className="border border-gray-300 rounded p-2"
        onChange={handleChange}
        value={recipe.name}
      />

      <label>Instructions</label>
      <textarea
        name="instructions"
        required
        placeholder="write a instructions"
        className="border border-gray-300 rounded p-2 resize-none"
        onChange={handleChange}
        value={recipe.instructions}
      ></textarea>

      <button
        className="bg-blue-500! hover:bg-blue-400! text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleSubmit}
        disabled={!recipe.name || !recipe.instructions || loading}
      >
        {loading ? "Creating..." : "Create Recipe"}
        {error && <span className="text-red-500">Error: {error.message}</span>}
      </button>
    </form>
  );
};
