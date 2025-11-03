# Gerador de Orçamentos Full-Stack (Java + React)
![Screenshot da tela principal da aplicação](./docs/images/imagem1.png "Tela principal")
[![My Skills](https://skillicons.dev/icons?i=js,react,java,spring,postgres,graphql)](https://skillicons.dev)

Aplicação web completa para automatizar a criação de orçamentos técnicos de talhas elétricas, com integração a um ERP externo via API GraphQL.

## O Problema
A criação de orçamentos para equipamentos industriais (talhas elétricas) era um processo manual, lento e sujeito a erros. Exigia a consulta de múltiplas tabelas, a aplicação de regras de negócio e a verificação manual de preços em um ERP de terceiros, podendo levar horas.

## A Solução
Esta aplicação web automatiza o processo. Ela fornece uma interface reativa React onde o utilizador pode selecionar um modelo de equipamento e configurar os opcionais disponíveis. O backend Spring Boot valida as regras de negócio e busca os preços atualizados em tempo real, via API GraphQL, de um ERP externo (Maxiprod), consolidando o orçamento completo em segundos.
