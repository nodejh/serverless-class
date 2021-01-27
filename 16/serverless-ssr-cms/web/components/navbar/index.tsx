// import React, { useContext } from 'react'
// import { IContext } from 'ssr-types'
// import { IData } from '@/interface'
import React from "react";
import { SProps } from "ssr-types";
import styles from "./index.less";

interface Props extends SProps {
  isHomePage?: boolean;
}

function Navbar(props: Props) {
  return (
    <div className={styles.navbarContainer}>
      {!props.isHomePage && (
        <span
          className={styles.home}
          onClick={() =>
            props.history.push("/")
          }
        >
          ←首页
        </span>
      )}
      <button className={styles.login}>登录</button>
      <button className={styles.register}>注册</button>
    </div>
  );
}

export default Navbar;
