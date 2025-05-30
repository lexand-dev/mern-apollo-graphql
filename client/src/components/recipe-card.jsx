import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import { DELETE_RECIPE, GET_RECIPES } from "../graphql/recipes";

export const RecipeCard = ({ recipe: { _id, name, instructions } }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${_id}`);
  };

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    variables: { id: _id },
    refetchQueries: [{ query: GET_RECIPES }]
  });

  const handleDelete = () => {
    deleteRecipe();
  };
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-400 mb-4">
        <strong>Instructions:</strong> {instructions}
      </p>
      <div className="flex justify-between">
        <button onClick={handleClick}>View Details</button>
        <button
          className="bg-red-500! hover:bg-red-400!"
          onClick={handleDelete}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};
