import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);

  const [searchWord, setSearchWord] = useState("");
  const [showOnlyUnfinished, setShowOnlyUnfinished] = useState(false);

  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    setFilteredTodos(
      todos
        .filter(todo => todo.title?.includes(searchWord))
        // .filter(todo => !showOnlyUnfinished || !todo.isCompleted)
        .filter((todo) => showOnlyUnfinished ? !todo.isCompleted : true)
    );
  }, [searchWord, showOnlyUnfinished]);

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
    Ha megjött a válasz, fetch-eld le újra a listát és rendereld ki!

  */

 useEffect(() => {
    const getTodos = async () => {
      const todos = await fetch("http://localhost:8080/teendok");
      const json = await todos.json();
      setTodos(json);
      setFilteredTodos(json);
    };

    getTodos().catch(console.error);
  }, []);


  return (
    <div className="App">


      <div className="container">
        <h1 className="bg-light mb-0 rounded-0 p-4">Teendők 200 db:</h1>
        <div className="mt-0 mb-3 p-3 bg-light rounded-0">
          <div className="row">

            <div className="col-6">
              <input type="text"
                className="form-control form-inline"
                placeholder="Keresés..."
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }} />
            </div>
            <br />
            <div className="col-6">
              <div className="row">
                <div className="col-8">
                  <label className="form-check-label float-right">Csak az elvégzendők mutatása:</label>
                </div>
                <div className="col-4">
                  <div className="form-check">
                    <input type="checkbox" onChange={(e) => {
                      setShowOnlyUnfinished(e.target.checked);
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group">

          {filteredTodos.map((todo) => (
            <li key={todo.id} style={{ textAlign: "left" }} className="list-group-item">
              <span className={"badge p-2 mr-2 " + todo.isCompleted ? "badge-success" : "badge-danger"}>✘</span>
              <span className={"mr-2 " + (todo.isCompleted ? "text-success" : "text-danger")} >
                {todo.title ?? "Nincs tartalom.."}
              </span>
              <button className="btn btn-sm btn-success float-right">
                Elvégzettnek jelölés
              </button>
            </li>)
          )}


          {/* <li className="list-group-item">
            <span className="badge p-2 mr-2 badge-success">✔</span
            ><span className="mr-2 text-success">quis ut nam facilis et officia qui</span
            ><button className="btn btn-sm btn-outline-danger float-right">Elvégzendőnek jelölés</button>
          </li> */}

        </ul>
      </div>




    </div>
  );
}



export default App;