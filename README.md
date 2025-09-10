# fcp-mpdp-core

Local development support for orchestrating all MPDP microservices.

## Prerequisites

To summarise the following prerequisites should be met, but ensure you refer to and meet all the prerequisites for each individual repository:  
- Node.js v22 or greater and NPM (Node Package Manager) v11 or greater. Easiest way to install both is to use NVM (Node Version Manager).  
- Docker
- Docker Compose  
- OpenJDK

## Repositories

[fcp-mpdp-backend](https://github.com/DEFRA/fcp-mpdp-backend)  
[fcp-mpdp-frontend](https://github.com/DEFRA/fcp-mpdp-frontend)  
[fcp-mpdp-journey-test-suite](https://github.com/DEFRA/fcp-mpdp-journey-test-suite)  
[fcp-mpdp-performance-test-suite](https://github.com/DEFRA/fcp-mpdp-performance-test-suite)

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

Run all services in detached mode.  

#### Optional arguments 

Any valid `docker compose down` argument.  
`-s` or `--seed` to seed the PostgreSQL database for `fcp-mpdp-backend` with fake data.  
`-jt` or `--journey-tests` to run the journey test suite with Playwright only.  
`-jt-b` or `--journey-tests-browserstack` to run the journey test suite with Playwright + BrowserStack.  
`-pt` or `--performance-tests` to run the performance test suite.  
Any combination of the above options.

### [Seed](./seed)

Utilises [fakerjs](https://fakerjs.dev) to generate fake data to populate the backend PostgreSQL database for local development. There is no need to interact with this script directly as it can be executed as an optional argument via the [`start`](#start) script.  
To ensure the journey test suite passes both locally and during CI/CD on CDP, a `testData` object is used to insert a known record (i.e. one which already exists in all CDP databases excluding production). This object can be easily updated at any time to match any existing record in the CDP databases. If the `testData` object is updated, ensure to make the same changes to the `testData` object on [fcp-mpdp-journey-test-suite](https://github.com/DEFRA/fcp-mpdp-journey-test-suite/blob/main/utils/test-data.js).  

### [Stop](./stop)

Stop all services.  

#### Optional arguments

Any valid `docker compose down` argument.

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
