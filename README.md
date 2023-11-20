# Project 1: Shared shopping list

It is a basic shopping list manager with a shared database written in javascript using Deno as a backend and eta framework for the frontend.

## Instruction for running the app

To start a normal workflow, run in the root of the project:

`docker compose up`

To execute the tests, run in the root of the project:

`docker compose build && docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf`

## Online location
You can find an online deployement at:

