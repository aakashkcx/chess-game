import { Link } from "react-router-dom";

import "./Menu.css";

export function Menu() {
  return (
    <div className="menu">
      <h1>Chess Game</h1>
      <nav>
        <Link to="/ai">Play vs AI</Link>
        <Link to="/local">Play vs Local</Link>
        <Link to="/online">Play vs Online</Link>
        <Link to="/analysis">Analysis Board</Link>
      </nav>
    </div>
  );
}
