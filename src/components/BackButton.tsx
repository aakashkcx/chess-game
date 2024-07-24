import { Link } from "react-router-dom";

import styles from "./BackButton.module.css";

export function BackButton() {
  return (
    <Link to="/" className={styles.back}>
      Back
    </Link>
  );
}
