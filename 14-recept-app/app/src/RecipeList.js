import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // immediately invoked function expression
    (async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + "/api/recipes").then((res) => res.json());

      setRecipes(res);
    })();
  }, []);

  return (
    <div>
      <h1>Recept lista </h1>
      <Link to="/">Home</Link>
      {recipes.map(recipe => <div key={recipe.id} className="card">

        <img src={process.env.REACT_APP_API_URL + "/static/images/" + recipe.imageURL} alt={recipe.name} />

        <h1>{recipe.name}</h1>

        <Link to={"/receptek/" + recipe.slug}>
        <button className="btn btn-sm btn-warning">Tovább</button>
        </Link>
      </div>)}
    </div>
  );
}
