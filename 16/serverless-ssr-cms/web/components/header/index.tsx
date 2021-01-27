import React from 'react';
import styles from './index.less'


function Header() {
  return (
    <div className={styles.headerContainer}>
        <div>
            <img className={styles.titleImg} src="https://s0.lgstatic.com/i/image2/M01/03/AD/CgpVE1_giICAEoTzAABHe3l-_iI699.png" alt="title"></img>
        </div>
        <div className={styles.title}>
            《玩转 Serverless 架构》
        </div>
    </div>
  )
}

export default Header
