import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'


export function Home() {

  // Komponens mount-kor
  // GET	/api/recipes	Összes recept kilistázása
  // A receptek darabszámát írd bele a tartalomba

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9090/api/recipes")
    .then(res => res.ok ? res.json() : [])
    .then(recipes => {
      setRecipes(recipes);
    });
  }, []);

  return (
    <div className="jumbotron bg-light">
      <h1>
      Üdv a recept appban! <br/>
      Jelenleg {recipes.length} recept elérhető
      </h1>
      <Link to="/receptek" className="btn btn-primary">
        <span className="me-2">Tovább</span>
        <FontAwesomeIcon icon={faArrowCircleRight} />
      </Link>
    </div>
  );
}
