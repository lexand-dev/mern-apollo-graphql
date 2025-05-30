import { RecipeForm } from "../components/recipe-form";
import { RecipesList } from "../components/recipe-list";

const RecipesPage = () => {
  return (
    <div className="container mx-auto pt-8 px-4 flex flex-col items-center justify-center h-screen">
      <h1
        className="
        text-4xl
        sm:text-3xl
        font-bold
        mb-6
        text-center"
      >
        My Recipe App
      </h1>
      <RecipeForm />
      <RecipesList />
    </div>
  );
};

export default RecipesPage;
