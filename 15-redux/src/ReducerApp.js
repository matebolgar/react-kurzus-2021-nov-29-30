import React, { useState, useEffect, useReducer } from "react";

function reducerFunction(prevState, action) {
  switch (action.type) {
    case "setLanguage":
      return {
        ...prevState,
        language: action.payload,
      }
    case "setDictionary":
      return {
        ...prevState,
        dictionary: action.payload,
      }
    default:
      return prevState
  }
}

function App() {
  const initialState = {
    language: "en",
    dictionary: {}
  }

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://kodbazis.hu/api/dictionary/${state.language}`).then(res => res.json());
      // setDictionary(res);
      dispatch({type: "setDictionary", payload: res})
    })()
  }, [state.language]);

  if (!state.dictionary) {
    return "Betöltés..."
  }

  return (
    <div className="container">
      <Dashboard
        language={state.language}
        setLanguage={(nyelv) => {
          dispatch({type: "setLanguage", payload: nyelv})
        }}
        dictionary={state.dictionary}
      />
    </div>
  );
}

function Dashboard({ language, setLanguage, dictionary }) {
  return (
    <div className="bg-white" style={{ borderRadius: 42, border: "10px solid rgb(34 34 34)" }}>
      <NyelvValasztoForm
        language={language}
        setLanguage={setLanguage}
        dictionary={dictionary}
      />
      <div className="row w-100 m-0">
        <Udvozles dictionary={dictionary} />
        <Tartalom dictionary={dictionary} />
      </div>
      <div className="row w-100 m-0">
        <Footer dictionary={dictionary} />
      </div>
    </div>)
}


function NyelvValasztoForm({ language, setLanguage, dictionary }) {
  return (
    <nav className="navbar navbar-light bg-light p-0" style={{ borderRadius: 42 }}>
      <label className="w-100 p-3">
        <h3>{dictionary.changeLanguage}:</h3>
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          defaultValue={language}
          className="form-control"
        >
          <option value="hun">Magyar</option>
          <option value="en">Angol</option>
          <option value="spa">Spanyol</option>
        </select>
      </label>
    </nav>
  );
}

function Udvozles({ dictionary }) {
  return (
    <div className="col-6 bg-warning jumbotron m-0 rounded-0" style={{ minHeight: 300 }}>
      <h1>{dictionary.greetings}!</h1>
    </div>
  );
}

function Tartalom({ dictionary }) {
  return (
    <div className="col-6 bg-danger jumbotron m-0 rounded-0">
      <h1>{dictionary.content}</h1>
    </div>
  );
}

function Footer({ dictionary }) {
  return (
    <div className="col-12 bg-dark jumbotron rounded-0 text-light" style={{ minHeight: 300 }}>
      <h1 className="text-center">{dictionary.goodLuck}</h1>
    </div>
  );
}

export default App;
