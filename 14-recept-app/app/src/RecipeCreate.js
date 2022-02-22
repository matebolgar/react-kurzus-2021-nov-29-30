import { faCheckCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function RecipeCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      id: uuidv4(),
      name: "",
      quantity: "",
      type: ""
    }
  ]);

  const [steps, setSteps] = useState([
    {
      id: uuidv4(),
      timer: "",
      content: "",
    }
  ]);


  return (
    <div className="container">
      <div className="card p-3">
        <h1>Új recept:</h1>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();


          const body = new FormData();
          body.append("name", name);
          body.append("ingredients", JSON.stringify(ingredients));
          body.append("steps", JSON.stringify(steps));

          const file = e.target.elements["img-url"].files[0]
          body.append("image", file);

          fetch(process.env.REACT_APP_API_URL + "/api/recipes", {
            method: "POST",
            body: body
          })
            .then(res => res.json())
            .then((newRecipe) => {
              navigate("/recept/" + newRecipe.slug);
            });
        }}>
          <div className="form-group row pb-3 border-bottom">
            <label className="col-sm-2 col-form-label">Név:</label>
            <div className="col-sm-10">
              <input type="text" name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control" required="" />
            </div>
          </div>
          <div className="form-group row pb-3 border-bottom">
            <label className="col-sm-2 col-form-label">Hozzávalók:</label>
            {ingredients.map((ingredient, i) => (
              <div key={ingredient.id} className="col-sm-10 offset-2">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="ingredient-name-0"
                      className="form-control d-inline-block mr-2 mb-2"
                      placeholder="Név"
                      required=""
                      value={ingredient.name}
                      onChange={(e) => {
                        e.persist();
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[i].name = e.target.value;
                          return next;
                        })
                      }}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      name="ingredient-quantity-0"
                      className="form-control d-inline-block mr-2 mb-2"
                      placeholder="Mennyiség"
                      required=""
                      value={ingredient.quantity}
                      onChange={(e) => {
                        e.persist();
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[i].quantity = e.target.value;
                          return next;
                        })
                      }}

                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      value={ingredient.type}
                      onChange={(e) => {
                        e.persist();
                        setIngredients((prev) => {
                          const next = [...prev];
                          next[i].type = e.target.value;
                          return next;
                        })
                      }}
                      name="ingredient-type-0"
                      className="form-control d-inline-block mr-2 mb-2" required=""
                    >
                      <option value="" disabled={true}>Típus</option>
                      <option value="meat">Hús</option>
                      <option value="drink">Ital</option>
                      <option value="dairy">Tejtermék</option>
                      <option value="fruit">Gyümölcs</option>
                      <option value="spice">Fűszer</option>
                      <option value="other">Egyéb</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <div className="w-100">
                      <button className="btn btn-danger mb-3" type="button" onClick={() => {
                        setIngredients(prev => {
                          const next = prev.slice();
                          next.splice(i, 1)
                          return next;
                        });
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="row w-100">
              <div className="col-md-3 offset-md-9">
                <button
                  type="button"
                  className="btn btn-success btn-sm float-right"
                  onClick={() => {
                    setIngredients(prev => {
                      return [
                        ...prev, {
                          id: uuidv4(),
                          name: "",
                          quantity: "",
                          type: ""
                        }]
                    })
                  }}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          <div className="form-group row pb-3 border-bottom">
            <label className="col-sm-2 col-form-label">Lépések:</label>

            {steps.map((step, i) => (
              <div key={step.id} className="col-sm-10 offset-2">
                <div className="row mb-3 border-bottom">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="step-content-0"
                      className="form-control d-inline-block mr-2 mb-2"
                      placeholder="1. lépés"
                      value={step.content}
                      onChange={(e) => {
                        e.persist();
                        setSteps((prev) => {
                          const next = [...prev];
                          next[i].content = e.target.value;
                          return next;
                        })
                      }}
                      required=""
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      name="step-timer-0"
                      className="form-control d-inline-block mr-2 mb-2"
                      placeholder="Idő"
                      min="1"
                      value={step.timer}
                      onChange={(e) => {
                        e.persist();
                        setSteps((prev) => {
                          const next = [...prev];
                          next[i].timer = e.target.value;
                          return next;
                        })
                      }}
                      required=""
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="w-100">
                      <button className="btn btn-danger mb-3" type="button"
                        onClick={() => {
                          setSteps((prev) => {
                            const next = prev.slice();
                            next.splice(i, 1)
                            return next;
                          })
                        }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>))}


            <div className="row w-100">
              <div className="col-md-3 offset-md-9">
                <button type="button" className="btn btn-success btn-sm float-right" onClick={() => {
                  setSteps(prev => {
                    return [
                      ...prev, {
                        id: uuidv4(),
                        timer: "",
                        content: "",
                      }]
                  })
                }}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          <div className="form-group row pb-3 border-bottom">
            <label className="col-sm-2 col-form-label">Kép:</label>
            <div className="col-md-6 offset-md-1">
              <input type="file" name="img-url" className="form-control" /><i
              >Figyelem, a fájlfeltöltés csak a mellékelt szerver programban működik!</i
              >
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-sm">
            Küldés
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
        </form>
      </div>
    </div>

  );
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}