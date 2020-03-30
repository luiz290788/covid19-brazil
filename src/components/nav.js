import React from "react"
import { Link } from "gatsby"
import styles from "../styles/nav.module.css"

export const Nav = () => (
  <nav className={styles.nav}>
    <Link to="/">Home</Link>
    <Link to="/politics">Políticos</Link>
    <Link to="/about">Sobre</Link>
  </nav>
)
