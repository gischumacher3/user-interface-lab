# 🚗 Sistema de Reserva de Viagens

Projeto desenvolvido em Java com foco em Programação Orientada a Objetos (POO), simulando um sistema simples de reserva de viagens, com gerenciamento de usuários, motoristas, veículos e processo de reserva.

## ✨ Sobre o projeto

O sistema permite cadastrar usuários (motoristas e passageiros), registrar veículos e realizar reservas de viagem com verificação de disponibilidade e cálculo automático do custo.

Ao confirmar uma reserva:
- o sistema valida se o veículo está disponível;
- calcula o valor da viagem;
- exibe os dados do passageiro;
- registra a data da viagem;
- atualiza o status do veículo para indisponível.

## 🧠 Conceitos aplicados

- Programação Orientada a Objetos (POO)
- Encapsulamento
- Construtores
- Métodos
- Arrays
- Relacionamento entre classes
- Regras de negócio
- Organização de código em Java

## 🏗 Estrutura do projeto

### Usuario
Responsável por armazenar:
- nome
- e-mail
- senha

### Veiculo
Responsável por:
- modelo
- placa
- preço por viagem
- motorista vinculado
- disponibilidade do veículo

### ReservarViagem
Responsável por:
- realizar reservas
- calcular custo da viagem
- validar disponibilidade do veículo
- atualizar status do veículo

### Main
Responsável por:
- cadastrar usuários
- cadastrar veículos
- listar informações
- executar simulação de reserva

## 🛠 Tecnologias utilizadas

- Java
- Programação Orientada a Objetos
- IntelliJ IDEA / Eclipse

## 🚀 Aprendizados

Com este projeto, aprofundei conhecimentos em:
- modelagem de classes;
- encapsulamento de atributos;
- relacionamento entre objetos;
- construção de lógica de negócio;
- desenvolvimento back-end com Java.

## 💜 Objetivo

Este projeto faz parte da minha jornada de aprendizado em desenvolvimento back-end, buscando construir soluções cada vez mais estruturadas, escaláveis e alinhadas às boas práticas de programação.