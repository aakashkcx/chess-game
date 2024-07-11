import { Link } from "react-router-dom";

import "./BackButton.css";

export function BackButton() {
  return (
    <Link to="/" className="back">
      Back
    </Link>
  );
}
