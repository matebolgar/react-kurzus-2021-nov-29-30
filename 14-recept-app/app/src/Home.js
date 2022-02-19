import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link to="/receptek">Tovább a receptekre</Link>
    </div>
  );
}
