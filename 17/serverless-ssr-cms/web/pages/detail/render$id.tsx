import React, { useContext } from "react";
import { IContext, SProps } from "ssr-types";
import { Data } from "@/interface";
import Navbar from "@/components/navbar";
import Content from "@/components/content";
import Title from "@/components/title";
import Tip from "@/components/tip";
import styles from "./index.less";

export default (props: SProps) => {
  const { state } = useContext<IContext<Data>>(window.STORE_CONTEXT);

  return (
    <div>
      <Navbar {...props}></Navbar>
      <div className={styles.container}>
        <Title>{state?.detailData?.title}</Title>
        <Tip
          date={state?.detailData?.date}
          wordCount={state?.detailData?.wordCount}
          readingTime={state?.detailData?.readingTime}
        />
        <Content>{state?.detailData?.content}</Content>
      </div>
    </div>
  );
};
