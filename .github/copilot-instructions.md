# FCP MPDP Core - AI Coding Agent Instructions

## Overview

Orchestration repository for local development of the Making Payment Data Public (MPDP) microservices. Provides shell scripts to manage all services, database seeding, and test execution.

## Architecture

### Orchestrated Services
This repository coordinates 3+ microservices:
- **[fcp-mpdp-frontend](../fcp-mpdp-frontend)** - Public user interface
- **[fcp-mpdp-backend](../fcp-mpdp-backend)** - REST API with PostgreSQL
- **[fcp-mpdp-admin](../fcp-mpdp-admin)** - Authenticated admin interface
- **fcp-mpdp-journey-test-suite** - Playwright E2E tests
- **fcp-mpdp-performance-test-suite** - Performance testing

All services are cloned as siblings to this repository.

### Repository Purpose
- **Not deployable** - Development tooling only
- Runs dependency containers (Postgres, Redis) and optionally the full app stack in Docker
- Seeds database with test data (Faker.js) — runs host-native against localhost:5432 by default
- Launches test suites
- Provides `fcp-mpdp.code-workspace` for opening all services in VS Code with compound run tasks

## Standards & Guidelines

This project follows:
- **[DEFRA Software Development Standards](https://defra.github.io/software-development-standards/)** - Team coding standards and practices

## Script Reference

### Core Development Scripts

```bash
./help                       # List all available commands
./clone                      # Clone all MPDP repos from GitHub
./build                      # Build Docker images (needed for --docker and journey tests)
./start -s                   # Seed database (host-native, localhost:5432); starts Postgres first
./start --docker             # Start full app stack in Docker (previous default)
./start --docker -s          # Start full stack in Docker + seed via container
./start -jt                  # Start + run journey tests (Playwright) — requires --docker
./start -pt                  # Start + run performance tests — requires --docker
./stop                       # Stop dependency containers (Postgres, Redis)
./stop --docker              # Stop full Docker app stack
./stop --docker -v           # Stop and remove volumes (clean state)
./pull                       # Git pull current branch in all repos
./update                     # Switch to main + pull in all repos
./open                       # Open all services in VS Code
./version                    # Show latest GitHub tags for all services
```

### VS Code workspace
Open `fcp-mpdp.code-workspace` to get all four repos as a multi-root workspace with pre-configured tasks:
- `code fcp-mpdp.code-workspace`
- `Ctrl+Shift+P` → Tasks: Run Task → **Local: Start all** (runs all three apps host-native in parallel, each in its own terminal)
- **Local: Seed** — seed the database from the workspace
- Individual **Local: Backend / Frontend / Admin** tasks if you only need one service

## Data Seeding

### Test Data Generation
Script: [data/seed.js](../data/seed.js)

Uses Faker.js to generate realistic payment data:
```javascript
// Example structure (see data/test-data.js)
{
  payee: faker.company.name(),
  scheme: faker.helpers.arrayElement(['BPS', 'CS', 'ES']),
  amount: faker.number.float({ min: 1000, max: 100000 }),
  year: faker.number.int({ min: 2015, max: 2024 }),
  county: faker.location.county()
}
```

### Test Data Synchronization
**Critical:** [data/test-data.js](../data/test-data.js) contains known record for E2E tests.
- Must match data in journey test suite
- If updated here, update `fcp-mpdp-journey-test-suite/utils/test-data.js`
- Used for stable assertions in automated tests

### Manual Seeding
```bash
cd fcp-mpdp-core
./seed                       # Host-native: seeds against localhost:5432 (requires Postgres up)
./seed --docker              # Via container: execs into the running backend Docker container
# Or use ./start -s (host-native) / ./start --docker -s (Docker)
```

Database client: [data/db-client.js](../data/db-client.js) — configurable via `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` env vars; defaults to `localhost:5432`.

## Development Workflow

### First-Time Setup
```bash
# 1. Clone this repository
git clone https://github.com/DEFRA/fcp-mpdp-core.git
cd fcp-mpdp-core

# 2. Clone all microservices (as siblings)
./clone

# 3. Install dependencies in each service
cd ../fcp-mpdp-backend && npm install
cd ../fcp-mpdp-frontend && npm install
cd ../fcp-mpdp-admin && npm install && cp .env.example .env
# Fill in ENTRA_* credentials in fcp-mpdp-admin/.env
cd ../fcp-mpdp-core

# 4. Start dependency containers and seed
./start -s

# 5. Open the workspace and run all apps
code fcp-mpdp.code-workspace
# Ctrl+Shift+P > Tasks: Run Task > Local: Start all
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Backend Swagger: http://localhost:3001/swagger
- Admin: http://localhost:3003
- PostgreSQL: localhost:5432

> **Admin prerequisite:** `fcp-mpdp-admin` requires real `ENTRA_*` credentials in its `.env` to start (Convict validates them at import time). This applies to both host-native and Docker workflows.

### Daily Development
```bash
./update                     # Pull latest changes in all repos
code fcp-mpdp.code-workspace
# Ctrl+Shift+P > Tasks: Run Task > Local: Start all
# (each npm run local brings up its own dependency containers)
./stop                       # When done (stops dep containers)
```

### Running Tests

#### Journey Tests (E2E)
```bash
./start -jt                  # Starts services + runs Playwright tests
# Or with BrowserStack:
./start -jt-b
```

#### Performance Tests
```bash
./start -pt                  # Starts services + runs k6 tests
```

#### Unit/Integration Tests
Run per-service:
```bash
cd ../fcp-mpdp-backend
npm test
```

## Project Structure

```
data/
  seed.js           # Database seeding script (Faker.js)
  test-data.js      # Known test record (sync with journey tests)
  db-client.js      # PostgreSQL connection helper
  constants.js      # Shared constants
clone               # Clone all repos script
build               # Build all Docker images
start               # Start services (with options)
stop                # Stop services
pull/update         # Git operations across repos
open                # Open in VS Code
version             # Check GitHub tags
help                # List commands
```

## Common Tasks

### Adding a New Microservice
1. Add repository URL to `./clone` script
2. Add Docker build command to `./build` script
3. Add Docker compose up/down to `./start` and `./stop` scripts
4. Update README.md with service description
5. Add to `./open` script for VS Code integration

### Updating Test Data
1. Modify [data/test-data.js](../data/test-data.js)
2. Update corresponding file in `fcp-mpdp-journey-test-suite`
3. Run `./start -s -jt` to verify tests still pass
4. Commit both repositories together

### Debugging Services
```bash
# View logs for a specific service
cd ../fcp-mpdp-backend
docker compose logs -f

# Access PostgreSQL
docker exec -it fcp-mpdp-backend-postgres-1 psql -U postgres -d fcp_mpdp_backend

# Inspect running containers
docker compose ps

# Check container health
docker inspect <container-name>
```

### Cleaning Up
```bash
./stop --docker -v           # Stop all Docker services and remove volumes
docker system prune -a       # Remove all unused Docker resources (use carefully)
```

### Version Management
```bash
./version                    # Shows latest GitHub release tags
# Compare with local versions in package.json files
```

## Prerequisites

Documented in [README.md](../README.md):
- Node.js 22+, npm 11+
- Docker and Docker Compose
- OpenJDK (for Liquibase)
- Sufficient disk space for all Docker images

## Architecture Documentation

[Confluence Architecture Diagrams](https://eaflood.atlassian.net/wiki/spaces/MAKING/pages/5746229435/Architecture)

Shows:
- Service boundaries and communication
- Data flow diagrams
- Deployment architecture on CDP
- Database schema design

## CDP Deployment

Services are deployed to Defra Cloud Platform (CDP) environments:
- `infra-dev` - Infrastructure team testing
- `dev` - Development environment
- `test` - QA testing
- `perf-test` - Performance testing
- `ext-test` - External stakeholder testing
- `prod` - Production

This repository is **not deployed** to CDP. Each microservice has its own GitHub Actions workflow for deployment.

## Troubleshooting

### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # PostgreSQL

# Stop conflicting services
./stop
```

### Database Connection Issues
```bash
# Verify Postgres is healthy
cd ../fcp-mpdp-backend
docker compose ps postgres

# Check logs
docker compose logs postgres

# Recreate database
./stop --docker -v && ./build && ./start --docker -s
```

### Services Won't Start
```bash
# Clean rebuild
./stop -v
docker system prune    # Careful: removes unused images
./build
./start -s
```

### Git Issues Across Repos
```bash
# Check status of all repos
for dir in ../fcp-mpdp-*/; do
  echo "=== $dir ==="
  cd "$dir" && git status
done

# Or use ./pull to update all
```
