# United Systems Cooperative Website

[![codecov](https://codecov.io/gh/Admiralfeb/usc-website/branch/main/graph/badge.svg?token=IaHGsZAblr)](https://codecov.io/gh/Admiralfeb/usc-website)
[![usc-website](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/k3gzuz&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/k3gzuz/runs)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Admiralfeb/usc-website.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Admiralfeb/usc-website/context:javascript)

## United Systems Cooperative

The USC is a player group of the game Elite: Dangerous.

Established in the game's year of 3306 (2020), the group has around 150 members from all across the globe.

## This site

This site was designed near the end of 2020 when the legacy site was unable to handle the new features of the USC Build system. Written once in Create React App, then moved into Next.js, the site has grown to encompass most of USC's knowledge of the game that has not been found in other places on the internet.

## Technologies Used

- Next.js / React
- MongoDb
- TypeScript
- next-auth
- swr
- mui
- vercel
- Testing:
  - cypress
  - jest
  - msw (to mock api requests)

## Dev Setup

### Dev Container (recommended)

Using a dev container, the dependencies of the application can be installed automatically.

1. Start the devcontainer. Dependencies will be installed. A mongodb instance will be started also.
2. Copy `.env.local.example` to `.env.local` and update it with the appropriate values. Mongodb's connection strings are set already for the dev instance.
3. Run `scripts/copy-sample-db-to-dev.mjs` to populate the database with some default data.

### Manual Setup

Requirements:

- mongodb instance
- nodejs 14.x with npm 7.x or later.

Setup:

1. Run `npm install`
2. Copy `.env.local.example` to `.env.local` and update it with the appropriate values. Mongodb's connection strings are set already for the dev instance.
3. Run `scripts/copy-sample-db-to-dev.mjs` to populate the database with some default data.

## Dev Notes

There is an `BYPASS_AUTH` boolean value in `.env.local`. If it is set to true, node is set to development, and mongodb is running locally, then it permits you to access the admin features of the site without having to be logged in.
