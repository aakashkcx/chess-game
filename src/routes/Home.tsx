import { Link } from "react-router-dom";

import "./Home.css";

export function Home() {
  return (
    <>
      <h1>Chess Game</h1>
      <ul>
        <li>
          <Link to="/ai">Play vs AI</Link>
        </li>
        <li>
          <Link to="/local">Play vs Local</Link>
        </li>
        <li>
          <Link to="/">Play vs Online</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis Board</Link>
        </li>
      </ul>
    </>
  );
}
