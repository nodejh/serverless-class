import React, { useContext } from "react";
import { SProps, IContext } from "ssr-types";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Item from "@/components/item";
import { IData } from "@/interface";
import styles from "./index.less";

export default (props: SProps) => {
  const { state } = useContext<IContext<IData>>(window.STORE_CONTEXT);
  // console.log(state?.indexData?.data);

  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>

      <div className={styles.post}>
        {state?.indexData?.data.map((item) => (
          <Item
            {...props}
            id={item.id}
            key={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
          ></Item>
        ))}
      </div>
    </div>
  );
};
