import React from "react";
import styles from "./index.less";

interface Props {
  children?: string;
}

function Title(props: Props) {
  return (
    <div className={styles.container}>
      <h1>{props.children || ''}</h1>
    </div>
  );
}

export default Title;
