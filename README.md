# Project 1: Shared shopping list

Write the documentation of your project here. Do not include your personal
details (e.g. name or student number).

Remember to include the address of the online location where your project is
running as it is a key part of the submission.

## Instruction for running the app

To start a normal workflow, run:

`docker compose up`

To run the tests, run:

`docker compose build && docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf`