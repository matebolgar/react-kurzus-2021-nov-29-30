import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function RecipeSingle() {
  const params = useParams();

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/recipes/" + params.receptSlug)
      .then((res) => res.json())
      .then(setRecipe);
  }, []);

  return (
    <div className="row m-2">
      <div className="col-md-8">
        <h1>{recipe.name}</h1>
        <div className="p-2">
          <h3>Hozzávalók:</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">egyszerű liszt (200g)</li>
            <li className="list-group-item">tojás (3)</li>
            <li className="list-group-item">tej (300ml)</li>
            <li className="list-group-item">növényi olaj (3 evőkanál)</li>
          </ul>
        </div>
      </div>
      <div className="col-md-4 m-auto">
      <img src={"http://localhost:9090/static/images/" + recipe.imageURL} alt={recipe.name} />
      </div>
    </div>
  );
}
