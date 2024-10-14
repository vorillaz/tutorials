# Prisma Playground and docs generation.

## Introduction

This is a demo project to show how to generate a tRPC server and alongside documentation from a Prisma schema. The article can be found [here](https://vorillaz.com/prisma-server).

## Scripts & Commands

- `pnpm install` to install the dependencies.
- `pnpm prisma:studio` to start the Prisma Studio.
- `pnpm prisma:migrate` to create a migration.
- `pnpm prisma:generate` to generate the Prisma Client, the documentation and the tRPC router definitions.
- `pnpm prisma:docs` to start the Prisma documentation server.
- `pnpm start` to start the tRPC server alongside the tRPC playground.
- `pnpm seed` to seed the database with some data.
- `pnpm touch:db` to create the SQLite database file.
