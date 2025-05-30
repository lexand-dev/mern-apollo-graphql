import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

import { GET_RECIPE } from "../graphql/recipes";

import { IngredientList } from "../components/ingredient-list";
import { IngredientForm } from "../components/ingredient-form";

const RecipeDetail = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.recipe) return <p>No recipe found.</p>;

  const { recipe } = data;

  return (
    <div className="mx-auto pt-12 px-4 flex flex-col items-center justify-center h-screen">
      <Link to="/recipes" className="text-blue-500 hover:text-blue-700">
        <button className="text-white px-4 py-2 rounded mb-4 transition-colors">
          Back
        </button>
      </Link>
      <h2 className="text-3xl font-semibold mb-4">{recipe.name}</h2>
      <p className="text-gray-400 mb-4">
        <strong>Instructions:</strong> {recipe.instructions}
      </p>
      <IngredientList ingredients={recipe.ingredients} />
      <h4 className="text-xl font-semibold mb-4">Add Ingredient:</h4>
      <IngredientForm recipeId={recipe._id} />
    </div>
  );
};

export default RecipeDetail;
