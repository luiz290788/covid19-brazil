import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { LastUpdate } from "./last-update"
import styles from "../styles/footer.module.css"

export const Footer = () => (
  <>
    <LastUpdate />
    <div className={styles.footer}>
      <a href="https://github.com/luiz290788/covid19-brazil">
        <FontAwesomeIcon size="lg" icon={faGithub} />
      </a>
      <a href="https://twitter.com/l2zg7e">
        <FontAwesomeIcon size="lg" icon={faTwitter} />
      </a>
    </div>
  </>
)
