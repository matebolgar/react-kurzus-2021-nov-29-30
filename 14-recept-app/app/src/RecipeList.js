import { faEye, faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);


  const alignToRows = (items) =>
    items.slice().reduceRight((acc, curr, i, arr) => {
      acc.push(arr.splice(0, 3));
      return acc;
    }, []);

  useEffect(() => {
    // immediately invoked function expression
    (async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + "/api/recipes").then((res) => res.json());

      setRecipes(res);
    })();
  }, []);

  return (
    <div className="container">
      {alignToRows(recipes).map((row, i) => <div key={i} className="row mb-3">
        {row.map(recipe =>
          <div key={recipe.id} className="col-md-4">
            <div className="card w-100 h-100">
              <img className="card-img-top mb-2" src={process.env.REACT_APP_API_URL + "/static/images/" + recipe.imageURL} />
              <div className="card-body"><h5 className="card-title">{recipe.name}</h5></div>
              <div className="w-75 p-3">
                <Link to={"/recept-szerkesztes/" + recipe.slug} className="btn btn-sm btn-outline-warning ms-2">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                <button type="button" className="btn btn-sm btn-outline-danger ms-2">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <Link to={"/recept/" + recipe.slug} className="btn btn-sm btn-outline-primary ms-2">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>)}
    </div>
  );
}