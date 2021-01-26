// import React, { useContext } from 'react'
// import { IContext } from 'ssr-types'
// import { IData } from '@/interface'
import React from 'react';
import styles from './index.less'

// interface SearchState extends IData {
//   search?: {
//     text: string
//   }
// }

function Navbar() {
  // const { state, dispatch } = useContext<IContext<SearchState>>(window.STORE_CONTEXT)
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch?.({
  //     type: 'updateContext',
  //     payload: {
  //       search: {
  //         text: e.target.value
  //       }
  //     }
  //   })
  // }

  // const toSearch = () => {
  //   location.href = `https://search.youku.com/search_video?keyword=`
  // }

  return (
    <div className={styles.navbarContainer}>
      {/* <input type="text" className={styles.input} value={state?.search?.text ?? ''} onChange={handleChange} placeholder="搜索" /> */}
       <button className={styles.login}>登录</button>
       <button className={styles.register}>注册</button>
    </div>
  )
}

export default Navbar
