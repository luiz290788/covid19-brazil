import React from "react"
import { Container } from "../components/container"

export default () => {
  return (
    <Container>
      <h2>Sobre</h2>
      <p>
        Criado por{" "}
        <a href="https://www.linkedin.com/in/jessica-ribeiro-alves/">
          Jéssica Ribeiro Alves
        </a>{" "}
        e{" "}
        <a href="https://www.linkedin.com/in/luiz290788/">
          Luiz Guilherme D'Abruzzo Pereira
        </a>{" "}
        para ajudar a visualizar os dados do Covid-19 no Brasil. Os dados desse
        site seguem os números divulgados pelo{" "}
        <a href="https://saude.gov.br/">Ministério da Saúde</a>.
      </p>
      <p>
        Esse é um projeto open source a vai continuar sendo evoluído enquanto
        estivermos em quarentena. Sugestões, correções e qualquer tipo de ajuda
        são bem vindos. Entre em contato com a gente no{" "}
        <a href="https://twitter.com/l2zg7e">twitter</a> ou no{" "}
        <a href="https://github.com/luiz290788/covid19-brazil">github</a>.
      </p>
    </Container>
  )
}
