import { useMutation } from "@apollo/client";
import { AiOutlineDelete } from "react-icons/ai";

import { DELETE_INGREDIENT, GET_RECIPE } from "../graphql/recipes";

export const IngredientCard = ({ ingredient }) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
    variables: { id: ingredient._id },
    refetchQueries: [
      { query: GET_RECIPE, variables: { id: ingredient.recipeId } }
    ]
  });

  const handleDelete = () => {
    deleteIngredient();
  };

  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{ingredient.name}</h3>
      <p className="text-gray-400 mb-4">
        {ingredient.quantity} {ingredient.unit}
      </p>
      <button
        className="bg-red-500! hover:bg-red-400! text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};
