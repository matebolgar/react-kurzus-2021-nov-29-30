import React, { useState, useEffect, useReducer, createContext, useContext } from "react";

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

const NyelviMukodesContext = createContext();
function NyelvKontextusEsState(props) {
  const initialState = {
    language: "en",
    dictionary: {}
  }

  const [state, dispatch] = useReducer(reducerFunction, initialState);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://kodbazis.hu/api/dictionary/${state.language}`).then(res => res.json());
      // setDictionary(res);
      dispatch({ type: "setDictionary", payload: res })
    })()
  }, [state.language]);

  if (!state.dictionary) {
    return "Betöltés..."
  }

  const value = [state, dispatch];

  return <NyelviMukodesContext.Provider children={props.children} value={value}>
  </NyelviMukodesContext.Provider>
}

function App() {

  return (
    <div className="container">
      <NyelvKontextusEsState>
        <Dashboard />
      </NyelvKontextusEsState>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="bg-white" style={{ borderRadius: 42, border: "10px solid rgb(34 34 34)" }}>
      <NyelvValasztoForm />
      <div className="row w-100 m-0">
        <Udvozles />
        <Tartalom />
      </div>
      <div className="row w-100 m-0">
        <Footer />
      </div>
    </div>)
}


function NyelvValasztoForm() {
  const [state, dispatch] = useContext(NyelviMukodesContext);
  return (
    <nav className="navbar navbar-light bg-light p-0" style={{ borderRadius: 42 }}>
      <label className="w-100 p-3">
        <h3>{state.dictionary.changeLanguage}:</h3>
        <select
          onChange={(e) => {
            // setLanguage(e.target.value);
            dispatch({type: "setLanguage", payload: e.target.value});
          }}
          defaultValue={state.language}
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

function Udvozles() {
  const [state, dispatch] = useContext(NyelviMukodesContext);
  return (
    <div className="col-6 bg-warning jumbotron m-0 rounded-0" style={{ minHeight: 300 }}>
      <h1>{state.dictionary.greetings}!</h1>
    </div>
  );
}

function Tartalom() {
  const [state, dispatch] = useContext(NyelviMukodesContext);
  return (
    <div className="col-6 bg-danger jumbotron m-0 rounded-0">
      <h1>{state.dictionary.content}</h1>
    </div>
  );
}

function Footer() {
  const [state, dispatch] = useContext(NyelviMukodesContext);
  return (
    <div className="col-12 bg-dark jumbotron rounded-0 text-light" style={{ minHeight: 300 }}>
      <h1 className="text-center">{state.dictionary.goodLuck}</h1>
    </div>
  );
}

export default App;
