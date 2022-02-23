import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bejelentkezes } from "./Bejelentkezes";
import { SzallasLista } from "./SzallasLista";
import { SzallasSingle } from "./SzallasSingle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bejelentkezes />} />
        <Route path="/osszes-szallas" element={<SzallasLista />} />
        <Route path="/szallas-:szallasId" element={<SzallasSingle />} />
        <Route path="*" element={<Bejelentkezes />} />
      </Routes>
    </BrowserRouter>
  );
}
