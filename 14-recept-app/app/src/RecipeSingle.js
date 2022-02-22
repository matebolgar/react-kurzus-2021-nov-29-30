import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";

export function RecipeSingle() {
  const params = useParams();

  const [recipe, setRecipe] = useState({});
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const [isPending, setPending] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch(process.env.REACT_APP_API_URL + "/api/recipes/" + params.receptSlug)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(setRecipe)
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  if (isError) {
    return "Hiba történt... Próbáld újra!";
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="row m-2">
        <div className="col-md-8">
          <h1>{recipe.name}</h1>
          <div className="p-2">
            <h3>Hozzávalók:</h3>
            <ul className="list-group list-group-flush">
              {recipe.ingredients?.map((ingredient, i) =>
                <li key={i} className="list-group-item">
                  {ingredient.name} ({ingredient.quantity})
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-md-4 m-auto">
          <img
            width="100%"
            className="card-img-top mb-2"
            src={"http://localhost:9090/static/images/" + recipe.imageURL}
            alt={recipe.name}
          />
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-9 border-right">
          <h3>Lépések:</h3>
          <ul className="list-group list-group-flush">
            {recipe.steps?.map((step, i) =>
              <li
                key={i}
                className={"list-group-item " + (i === selectedStepIndex ? "active" : "")}
                onClick={() => {
                  setSelectedStepIndex(i);
                }}
              >
                {step.content}
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-3 border-right">
          <div className="card">
            <div className="card-body text-center">
              <h2>
                <FontAwesomeIcon icon={faClock} />
                <br />
                {recipe.steps?.[selectedStepIndex].timer} perc
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}