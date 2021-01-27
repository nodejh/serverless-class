import React from 'react';
import ReactMarkdown from 'react-markdown'
import styles from './index.less'

interface Props {
    children?: string;
}


function Content(props: Props) {
  return (
    <div className={styles.main}>
        <ReactMarkdown>{props.children || ''}</ReactMarkdown>
    </div>
  )
}

export default Content
