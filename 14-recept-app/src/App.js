import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Fragment } from "react";
import { Home } from "./Home";
import { RecipeList } from "./RecipeList";
import { RecipeSingle } from "./RecipeSingle";

function App() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="" id="navbarNav">
          <ul className="navbar-nav lead font-weight-bold">
            <li className="nav-item"></li>
            <li className="nav-item">
              <Link to="/">
                <span className="nav-link pt-4">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/receptek">
                <span className="nav-link pt-4">Receptek</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/uj-recept">
                <span className="nav-link pt-4">Új recept</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receptek" element={<RecipeList />} />
        <Route path="/receptek/:receptSlug" element={<RecipeSingle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      Footer
    </Fragment>
  );
}

function NotFound() {
  return (
    <div>
      Oldal nem található
      <Link to="/">
        <button className="btn btn-primary">Vissza a kezdőlapra</button>
      </Link>
    </div>
  );
}

export default App;
