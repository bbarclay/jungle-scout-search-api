# jungle-scout-search-api

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Docker](https://docs.docker.com/v17.12/docker-for-mac/install/)

## Installation

- `git clone https://github.com/aklkv/jungle-scout-search-api.git` this repository
- `cd jungle-scout-search-app`
- `npm install`
- `docker-composer up`

### Running Tests

Tests are located in `/tests`.

- `docker-composer up db`
- `npm test`

### Linting

- `npm run lint:js`
- `npm run lint:js -- --fix`

### Deploying & Infrastructure

This API is deployed and hosted on AWS ECS Cluster with 4 tasks combined into load balanced service.
Production API is hosted [here](https://search-api.aklkv.com)

### Architecture

#### Routes

- `POST /v1/register` - it takes the name of the app and small description. In response it returns API Key that must set as `X-API-KEY` header on all subsequent requests.
- `GET /v1/search?asin=${asin}` - If ASIN is found it will return: `category`, `dimensions`, `rank`, `asin`, `updatedAt` and `createdAt`.
