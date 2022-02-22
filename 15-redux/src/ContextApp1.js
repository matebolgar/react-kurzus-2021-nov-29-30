import React, { useState, useEffect, createContext, useContext } from "react";
import { SetNyelvKontextus } from ".";

const SzotarKontextus = createContext();
const NyelvKontextus = createContext();


function App() {
  const [language, setLanguage] = useState('hun');
  const [dictionary, setDictionary] = useState({});

  // useEffect(() => {
  //   let test = false;
  //   setInterval(() => {
  //     setLanguage(test ? "en" : "spa");
  //     test = !test
  //   }, 1000)
  // }, [])

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://kodbazis.hu/api/dictionary/${language}`).then(res => res.json());
      setDictionary(res);
    })()
  }, [language]);

  if (!dictionary) {
    return "Betöltés..."
  }

  return (
    <div className="container">
      <SzotarKontextus.Provider value={dictionary}>
        <NyelvKontextus.Provider value={language}>
          <SetNyelvKontextus.Provider value={setLanguage}>
            <Dashboard />
          </SetNyelvKontextus.Provider>
        </NyelvKontextus.Provider>
      </SzotarKontextus.Provider>
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
  const dictionary = useContext(SzotarKontextus);
  const language = useContext(NyelvKontextus);
  const setLanguage = useContext(SetNyelvKontextus);
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

function Udvozles() {
  const dictionary = useContext(SzotarKontextus);
  return (
    <div className="col-6 bg-warning jumbotron m-0 rounded-0" style={{ minHeight: 300 }}>
      <h1>{dictionary.greetings}!</h1>
    </div>
  );
}

function Tartalom() {
  const dictionary = useContext(SzotarKontextus);
  return (
    <div className="col-6 bg-danger jumbotron m-0 rounded-0">
      <h1>{dictionary.content}</h1>
    </div>
  );
}

function Footer() {
  const dictionary = useContext(SzotarKontextus);
  return (
    <div className="col-12 bg-dark jumbotron rounded-0 text-light" style={{ minHeight: 300 }}>
      <h1 className="text-center">{dictionary.goodLuck}</h1>
    </div>
  );
}

export default App;
