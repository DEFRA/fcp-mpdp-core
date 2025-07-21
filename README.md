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

### Help

List all available commands.  
[`./help`](./help)

### Clone

Clone all repositories from GitHub. Repositories will be cloned in the parent directory of this repository.  
[`./clone`](./clone)

### Update

Switch to main branch in every repository and pull latest changes with `git pull`.  
[`./update`](./update)

### Pull

Pull latest changes from current branch in every repository with `git pull`.  
[`./pull`](./pull)

### Build

Build/rebuild Docker container for all microservices.  
[`./build`](./build)

### Start

Run all services in detached mode.  
[`./start`](./start)

#### Optional arguments 

Any valid `docker compose down` argument.  
`-jt` or `--journey-tests` to run the journey test suite.  
`-pt` or `--performance-tests` to run the performance test suite.  
`-jt -pt` or `--journey-tests --performance-tests` to run all test suites.

### Stop

Stop all services.  
[`./stop`](./stop)

#### Optional arguments

Any valid `docker compose down` argument.

### Open

Open all microservices in Visual Studio Code.  
[`./open`](./open)

### Version

List latest GitHub release/tag version for each microservice.  
[`./version`](./version)

## VS Code Command Palette

For Visual Studio Code users, all of the above commands can be run from the VS Code command palette:  
`ctrl` + `shift` + `P` (or `cmd` + `shift` + `P` for Mac users) > Tasks: Run Task > Select the task you want to run.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.