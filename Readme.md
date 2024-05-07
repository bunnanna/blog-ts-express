# Blog Express Typescript API

## About this project

This project is blog contents application API using TDD and clean architecture.

## Dependencies

### Language

- Typescript with node

### Package Manager

- pnpm

### Framework

- express.js

### Database

- postgresql

### ORM

- prisma

### Validator

- express-validator

### Dependency Injection

- inversify
- reflect-metadata

### Linter

- eslint
- prettier

### Test

- jest
- supertest

### Container

- docker
- docker compose

## Service

### Auth

```mermaid
---
title User
---
flowchart TB

  Request["Express"]
  subgraph UserController["UserController : IUserController"]
  direction TB
    UserController.router[router]
    UserController.register[register]
    UserController.getById[getById]
    UserController.router --Post /-->  UserController.register
    UserController.router --Get /:userId-->  UserController.getById
  end

  RegisterUseCase["RegisterUseCase : IRegisterUseCase"]

  GetUserUseCase["GetUserUseCase : IGetUserUseCase"]

  UserRepository["UserRepository : IUserRepository"]

  Prisma

  db[(Postgres)]

Request --/users--> UserController
UserController.register ---> RegisterUseCase
UserController.getById ---> GetUserUseCase
RegisterUseCase & GetUserUseCase ---> UserRepository
 UserRepository ---> Prisma <---> db

```
