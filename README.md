# fcp-mpdp-core
Local development support for orchestrating all MPDP microservices.
## Prerequisites
To summarise the following prerequisites should be met, but ensure you refer to and meet all the prerequisites for each individual repository:  
Node.js v22 or greater and NPM (Node Package Manager) v11 or greater. Easiest way to install both is to use NVM (Node Version Manager).  
Docker  
OpenJDK
## Repositories
[fcp-mpdp-backend](https://github.com/DEFRA/fcp-mpdp-backend)  
[fcp-mpdp-frontend](https://github.com/DEFRA/fcp-mpdp-frontend)  
[fcp-mpdp-journey-test-suite](https://github.com/DEFRA/fcp-mpdp-journey-test-suite)  
[fcp-mpdp-performance-test-suite](https://github.com/DEFRA/fcp-mpdp-performance-test-suite)
## Scripts
Command | Description | Optional arguments 
--------|-------------|--------------------
[`./clone`](./clone) | Clone all repositories from GitHub. Repositories will cloned in the parent directory of this repository. | n/a
[`./update`](./update) | Switch to main branch in every repository and pull latest changes with `git pull`. | n/a
[`./build`](./build) | Build/rebuild Docker container for all microservices. | n/a
[`./start`](./start) | Run all services in detached mode. | Any valid `docker compose down` argument.
[`./stop`](./stop) | Stop all services. | Any valid `docker compose down` argument. | n/a
[`./open`](./open) | Open all microservices in Visual Studio Code. | n/a
[`./version`](./version) | List latest GitHub release version for each microservice. | n/a