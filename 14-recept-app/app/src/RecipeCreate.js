import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export function RecipeCreate() {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      quantity: "",
      type: ""
    }
  ]);


  return (
    <div className="container">
      <div className="card p-3">
        <h1>Új recept:</h1>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.elements.name.value);
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
              <div key={i} className="col-sm-10 offset-2">
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
            <div className="col-sm-10 offset-2">
              <div className="row mb-3 border-bottom">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="step-content-0"
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder="1. lépés"
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
                    required=""
                  />
                </div>
                <div className="col-md-2">
                  <div className="w-100">
                    <button className="btn btn-danger mb-3" type="button">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="trash"
                        className="svg-inline--fa fa-trash fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-10 offset-2">
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="step-content-1"
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder="2. lépés"
                    required=""
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    name="step-timer-1"
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder="Idő"
                    min="1"
                    required=""
                  />
                </div>
                <div className="col-md-2">
                  <div className="w-100">
                    <button className="btn btn-danger mb-3" type="button">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="trash"
                        className="svg-inline--fa fa-trash fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100">
              <div className="col-md-3 offset-md-9">
                <button type="button" className="btn btn-success btn-sm float-right">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="plus"
                    className="svg-inline--fa fa-plus fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    ></path>
                  </svg>
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
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              className="svg-inline--fa fa-check-circle fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>

  );
}