import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadDictionary,
  selectDictionary,
  selectLanguage,
} from './languageSlice';

export function Dashboard() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const dictionary = useSelector(selectDictionary);

  useEffect(() => {
    dispatch(loadDictionary(language))
  }, []);

  if (!dictionary) {
    return "Betöltés..."
  }

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
  const dictionary = useSelector(selectDictionary);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-light bg-light p-0" style={{ borderRadius: 42 }}>
      <label className="w-100 p-3">
        <h3>{dictionary.changeLanguage}:</h3>
        <select
          onChange={(e) => {
            dispatch(loadDictionary(e.target.value))
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
  const dictionary = useSelector(selectDictionary);
  return (
    <div className="col-6 bg-warning jumbotron m-0 rounded-0" style={{ minHeight: 300 }}>
      <h1>{dictionary.greetings}!</h1>
    </div>
  );
}

function Tartalom() {
  const dictionary = useSelector(selectDictionary);
  return (
    <div className="col-6 bg-danger jumbotron m-0 rounded-0">
      <h1>{dictionary.content}</h1>
    </div>
  );
}

function Footer() {
  const dictionary = useSelector(selectDictionary);
  return (
    <div className="col-12 bg-dark jumbotron rounded-0 text-light" style={{ minHeight: 300 }}>
      <h1 className="text-center">{dictionary.goodLuck}</h1>
    </div>
  );
}


