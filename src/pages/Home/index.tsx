import React from "react";

import styles from "./Home.module.scss";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to our FSD Boilerplate</h1>
    </div>
  );
};
