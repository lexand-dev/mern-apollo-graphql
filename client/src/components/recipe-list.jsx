import { useQuery } from "@apollo/client";

import { RecipeCard } from "./recipe-card";
import { GET_RECIPES } from "../graphql/recipes";

export const RecipesList = () => {
  const { data, loading, error } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.recipes || data.recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold my-4">Recipes</h2>
      <ul>
        {data.recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};
