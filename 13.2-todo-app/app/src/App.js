import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [patchPendingId, setPatchPendingId] = useState(null);

  function fetchTodos() {
    return fetch("http://localhost:8080/teendok")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setTodos)
      .catch(() => {
        alert("Hiba történt");
      });
  }

  /*
    1. Módosítsd a renderelő logikát, a template.html sablonnak megfelelően
      Ha az adott teendő isCompleted kulcsa true:
        A gomb legyen "Elvégzendőnek jelölés" feliratú
      máskülönben
        A gomb legyen "Elvégzettnek jelölés" feliratú

    2.
    Gombra való kattintáskor küldj kérést PATCH methoddal a
    http://localhost:8080/teendok?id=" + id URL-re, a következő JSON body-val!
    { isCompleted: true/false }

    3.
    Amíg a kérés folyamatban van, a megadott elem gombját állítsd disabled-re és írd ki a
    "Módosítás folyamatban" feliratot, az adott listaelemnél!
    
    4.
    Ha megjött a válasz, a state-ben is állítsd be az új állapotot!

  */

  const [isInitializing, setInitializing] = useState(true);
  useEffect(() => {
    setInitializing(true);
    fetchTodos().then(() => setInitializing(false));
  }, []);

  const [isShowOnlyUncompleted, setShowOnlyUnCompleted] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const filtered = todos
      .filter((todo) => (isShowOnlyUncompleted ? !todo.isCompleted : true))
      .filter((todo) => todo.title.includes(searchWord));
    setFilteredTodos(filtered);
  }, [todos, isShowOnlyUncompleted, searchWord]);

  return (
    <div className="container">
      <h1 className="bg-light mb-0 rounded-0 p-4">Teendők {!isInitializing ? filteredTodos.length + " db:" : ""}</h1>
      <div className="mt-0 mb-3 p-3 bg-light rounded-0">
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control form-inline"
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              placeholder="Keresés..."
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-8">
                <label className="form-check-label float-right">Csak az elvégzendők mutatása:</label>
              </div>
              <div className="col-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-control"
                    onChange={() => {
                      setShowOnlyUnCompleted((prev) => !prev);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isInitializing ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        ""
      )}

      <ul className="list-group">
        {filteredTodos.map((todo) => <ListItem
          key={todo.id}
          todo={todo}
          setPatchPendingId={setPatchPendingId}
          patchPendingId={patchPendingId}
          fetchTodos={fetchTodos}
        />)}
      </ul>
    </div>
  );
}

function ListItem({ todo, setPatchPendingId, patchPendingId, setTodos }) {


  function patchTodo(id, isCompleted) {
    setPatchPendingId(id);
    fetch("http://localhost:8080/teendok?id=" + id, {
      method: "PATCH",
      body: JSON.stringify({ isCompleted: isCompleted }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(() => {
        setTodos(prev => {
          const i = prev.findIndex(todo => todo.id === id);
          prev[i] = {
            ...prev[i],
            isCompleted: isCompleted
          } 
          return prev;
        })
      })
      .then(() => setPatchPendingId(null))
      .catch((err) => {
        alert("Hiba történt");
      });
  }

  if (todo.id === patchPendingId) {
    return (
      <li className="list-group-item text-center">
        <div className="spinner-border text-primary"></div>
      </li>
    );
  }

  return (
    <li className="list-group-item">
      <span className={"badge p-2 mr-2 " + (todo.isCompleted ? "badge-success" : "badge-danger")}>
        {todo.isCompleted ? "✔" : "✘"}
      </span>
      <span className={"mr-2 " + (todo.isCompleted ? "text-success" : "text-danger")}>{todo.title}</span>
      {todo.isCompleted ? (
        <button
          className="btn btn-sm btn-outline-danger float-right"
          onClick={() => {
            patchTodo(todo.id, false);
          }}
        >
          Elvégzendőnek jelölés
        </button>
      ) : (
        <button
          className="btn btn-sm btn-success float-right"
          onClick={() => {
            patchTodo(todo.id, true);
          }}
        >
          Elvégzettnek jelölés
        </button>
      )}
    </li>
  );
}

export default App;
