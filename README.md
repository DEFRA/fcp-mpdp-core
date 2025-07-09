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