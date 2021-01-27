import React from "react";
import styles from "./index.less";

interface Props {
  date?: string;
  wordCount?: number;
  readingTime?: number;
}

function Tip(props: Props) {
  return (
    <div className={styles.container}>
      <span>{props.date}</span>
      <span> · </span>
      <span>共{props.wordCount}字</span>
      <span> · </span>
      <span>阅读大约需要{props.readingTime}分钟</span>
    </div>
  );
}

export default Tip;
