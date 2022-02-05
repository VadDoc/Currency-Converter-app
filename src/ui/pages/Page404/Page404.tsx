import styles from './Page404.module.scss'
import React from "react";

export const Page404 = React.memo(() => {

  return (
    <div className={styles.page404}>
      <h1>Page 404</h1>
      <h2>You have entered the address of a non-existent page, follow the links below</h2>
    </div>
  )
})