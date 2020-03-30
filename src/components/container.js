import React from "react"
import { Header } from "./header"
import { Nav } from "./nav"

import styles from "../styles/container.module.css"
import { Footer } from "./footer"

export const Container = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <Nav />
    <div className={styles.content}>{children}</div>
    <Footer />
  </div>
)
