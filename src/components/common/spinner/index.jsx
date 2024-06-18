import React from "react";
import styles from "./spinner.module.css";

export default function Spinner({ fullPage = false, statusMessage }) {
  return (
    <>
      <div
        data-testid="spinner"
        className={fullPage ? styles.fullPageSpinner : ""}
      >
        <div className={styles.spinner}></div>
      </div>
      <div className="mt-4 text-base font-medium">{statusMessage}</div>
    </>
  );
}
