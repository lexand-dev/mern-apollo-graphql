import { IngredientCard } from "./ingredient-card";

export const IngredientList = ({ ingredients }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-center">Ingredient List</h2>
      {ingredients && ingredients.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto justify-center">
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient._id} ingredient={ingredient} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center my-4">
          No ingredients found for this recipe.
        </p>
      )}
    </div>
  );
};
