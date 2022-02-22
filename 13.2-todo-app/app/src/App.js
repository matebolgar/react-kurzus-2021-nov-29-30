import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [pendingIds, setPendingIds] = useState([]);

  function fetchTodos() {
    return fetch("http://localhost:8080/teendok")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setTodos)
      .catch(() => {
        alert("Hiba történt");
      });
  }

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
          setPendingIds={setPendingIds}
          pendingIds={pendingIds}
          setTodos={setTodos}
        />)}
      </ul>
    </div>
  );
}

function ListItem({ todo, setPendingIds, pendingIds, setTodos }) {

  function patchTodo(id, isCompleted) {
    setPendingIds(prev => [...prev, id]);
    fetch("http://localhost:8080/teendok?id=" + id, {
      method: "PATCH",
      body: JSON.stringify({ isCompleted: isCompleted }),
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(prev => {
          const next = prev.slice();
          // const next = [...prev];
          // const next = {...prev};

          const i = prev.findIndex(todo => todo.id === id);
          next[i] = {
            ...prev[i],
            isCompleted: isCompleted
          }
          
          return next;
        })
      })
      .then(() => {
        setPendingIds(prev => prev.filter(todoId => todoId !== id));
      })
      .catch((err) => {
        alert(err);
      });
  }

  if (pendingIds.includes(todo.id)) {
    return (
      <li className="list-group-item text-center">
        <div className="spinner-border text-primary"></div>
      </li>
    );
  }

  return (
    <li className="list-group-item" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <span className={"p-2 mr-2"}>
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
