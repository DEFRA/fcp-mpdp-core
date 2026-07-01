# fcp-mpdp-core

Local development support for orchestrating all MPDP microservices.

## Prerequisites

To summarise the following prerequisites should be met, but ensure you refer to and meet all the prerequisites for each individual repository:  
- Node.js v24 or greater and NPM (Node Package Manager) v11 or greater. Easiest way to install both is to use NVM (Node Version Manager).  
- Docker
- Docker Compose  
- OpenJDK

## Repositories

[fcp-mpdp-admin](https://github.com/DEFRA/fcp-mpdp-admin)  
[fcp-mpdp-backend](https://github.com/DEFRA/fcp-mpdp-backend)  
[fcp-mpdp-frontend](https://github.com/DEFRA/fcp-mpdp-frontend)  
[fcp-mpdp-journey-test-suite](https://github.com/DEFRA/fcp-mpdp-journey-test-suite)  
[fcp-mpdp-performance-test-suite](https://github.com/DEFRA/fcp-mpdp-performance-test-suite)

## Development

Each individual repository supports standalone host-native development without needing the full system:

```bash
nvm use && npm install     # install dependencies
cp .env.example .env       # configure environment variables
npm run local              # start dependency containers and run the server
```

Use this repository (`fcp-mpdp-core`) when you need to run all services together, seed the database with test data, or execute the journey/performance test suites.

### Host-native (default)

The default workflow runs the three apps directly on the host with hot reload. Only the stateful backing services (PostgreSQL, Redis) run in Docker.

**First-time setup:**

```bash
./clone                    # clone all sibling repos
cd ../fcp-mpdp-backend && npm install
cd ../fcp-mpdp-frontend && npm install
cd ../fcp-mpdp-admin && npm install && cp .env.example .env
# fill in ENTRA_* credentials in fcp-mpdp-admin/.env
```

> **Admin prerequisite:** `fcp-mpdp-admin` uses OIDC authentication (Microsoft Entra). The app cannot start without real `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, `ENTRA_CLIENT_SECRET`, and related values in its `.env`. This is the same requirement as the Docker workflow.

**Workflow:**

```bash
code fcp-mpdp.code-workspace
# Ctrl+Shift+P > Tasks: Run Task > Local: Start all
```

Each app's `npm run local` starts its own dependency containers (Postgres, Redis) automatically. No separate `./start` step is needed unless you want to seed the database first:

```bash
./start -s                 # seed the database, then open the workspace as above
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Backend Swagger: http://localhost:3001/swagger
- Admin: http://localhost:3003
- PostgreSQL: localhost:5432

To stop the dependency containers:

```bash
./stop
```

### Docker (full-stack fallback)

Use `--docker` to run everything in containers. Requires `./build` first.

```bash
./build                    # build Docker images
./start --docker           # start all services in Docker
./start --docker -s        # start and seed
./stop --docker            # stop all services
./stop --docker -v         # stop and remove volumes (clean state)
```

## Architecture

There are several diagrams illustrating the architecture for MPDP that are available on [Confluence](https://eaflood.atlassian.net/wiki/spaces/MAKING/pages/5746229435/Architecture).

## Scripts

### [Help](./help)

List all available commands.  

### [Clone](./clone)

Clone all repositories from GitHub. Repositories will be cloned in the parent directory of this repository.  

### [Update](./update)

Switch to main branch in every repository and pull latest changes with `git pull`.  

### [Pull](./pull)

Pull latest changes from current branch in every repository with `git pull`.  

### [Build](./build)

Build/rebuild Docker container for all microservices.  

### [Start](./start)

For host-native development, the only reason to run this script is to seed the database (`-s`). Each app's `npm run local` handles its own dependency containers automatically. Pass `--docker` to run the full app stack in Docker instead.

#### Optional arguments

`--docker` to run all apps in Docker containers.  
`-s` or `--seed` to seed the PostgreSQL database with fake data.  
`-jt` or `--journey-tests` to run the journey test suite with Playwright only.  
`-jt-b` or `--journey-tests-browserstack` to run the journey test suite with Playwright + BrowserStack.  
`-pt` or `--performance-tests` to run the performance test suite.  
Any combination of the above options.

### [Seed](./seed)

Utilises [fakerjs](https://fakerjs.dev) to generate fake data to populate the backend PostgreSQL database for local development. The easiest way to run it is via `./start -s`. It can also be run directly:

```bash
./seed             # host-native: seeds against localhost:5432 (requires Postgres container up)
./seed --docker    # via container: execs into the running fcp-mpdp-backend Docker container
```

To ensure the journey test suite passes both locally and during CI/CD on CDP, a `testData` object is used to insert a known record (i.e. one which already exists in all CDP databases excluding production). This object can be easily updated at any time to match any existing record in the CDP databases. If the `testData` object is updated, ensure to make the same changes to the `testData` object on [fcp-mpdp-journey-test-suite](https://github.com/DEFRA/fcp-mpdp-journey-test-suite/blob/main/utils/test-data.js).  

### [Stop](./stop)

By default, stops the dependency containers only (Postgres, Redis). Pass `--docker` to stop the full app stack.

#### Optional arguments

`--docker` to stop all app containers (matches `./start --docker`).  
Any valid `docker compose down` argument (e.g. `-v` to remove volumes).

### [Open](./open)

Open all microservices in Visual Studio Code.  

### [Version](./version)

List latest GitHub release/tag version for each microservice.  

## VS Code Command Palette

For Visual Studio Code users, all of the above commands can be run from the VS Code command palette:  
`ctrl` + `shift` + `P` (or `cmd` + `shift` + `P` for Mac users) > Tasks: Run Task > Select the task you want to run.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of His Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
