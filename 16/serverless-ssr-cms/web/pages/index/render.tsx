import React, { useContext } from "react";
import { SProps, IContext } from "ssr-types";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Item from "@/components/item";
import { IData } from "@/interface";
import styles from "./index.less";

export default (props: SProps) => {
  const { state } = useContext<IContext<IData>>(window.STORE_CONTEXT);

  return (
    <div>
      <Navbar {...props} isHomePage={true}></Navbar>
      <Header></Header>

      <div className={styles.container}>
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
