import React from "react"
import { Header } from "./header"
import { Nav } from "./nav"
import { LastUpdate } from "./last-update"
import styles from "../styles/container.module.css"
import { Footer } from "./footer"
import { RegionList } from "./region-list"

export const Container = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.navContainer}>
      <Nav />
      <LastUpdate />
    </div>
    <div className={styles.content}>{children}</div>
    <h3>Veja os números por estado</h3>
    <RegionList />
    <Footer />
  </div>
)
