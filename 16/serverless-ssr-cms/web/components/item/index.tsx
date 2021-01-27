import React from "react";
import { Article } from "@/interface";
import styles from "./index.less";
import { SProps } from "ssr-types";

export interface Props extends Article, SProps {}

function Item(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div
          className={styles.title}
          onClick={() =>
            props.history.push("/detail/3f8a198c-60a2-11eb-8932-9b95cd7afc2d")
          }
        >
          {props.title}
        </div>
        <div className={styles.date}>{props.date}</div>
      </div>
      <div className={styles.content}>{props.content}</div>
    </div>
  );
}

export default Item;
