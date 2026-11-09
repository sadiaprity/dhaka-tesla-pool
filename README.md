# Dhaka Tesla Pool

A full-stack ride-pooling application built around a simple idea: multiple passengers travelling along compatible routes can share one vehicle, while the system manages seat capacity, individual fares, ride requests, and trip status.

The project simulates a Tesla ride-pooling service in Dhaka using predefined city zones rather than real-time maps or routing APIs.

**Demo Video:** [Watch the project demonstration](https://www.youtube.com/watch?v=UH3pYybg3Yc)

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [How Ride Pooling Works](#how-ride-pooling-works)
- [Ride Lifecycle](#ride-lifecycle)
- [Fare Calculation](#fare-calculation)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [Demo Scenario](#demo-scenario)
- [Key Engineering Decisions](#key-engineering-decisions)
- [AI Usage](#ai-usage)
- [Limitations and Future Improvements](#limitations-and-future-improvements)
- [Author](#author)

---

## Overview

Dhaka Tesla Pool is a ride-sharing application designed to demonstrate how multiple ride requests can be grouped into a single trip without exceeding vehicle capacity.

The application has two user roles:

**Passenger**
- Create an account and log in.
- Request a ride by selecting pickup and destination zones.
- Specify the number of seats required.
- View the estimated fare.
- Track ride status.
- View ride history.
- Cancel eligible ride requests.

**Driver**
- Log in to a driver account.
- Register a vehicle with a fixed seating capacity.
- Switch between online and offline status.
- View ride requests assigned to their vehicle.
- Accept a ride pool.
- Update the trip status as it progresses.
- View passenger details, allocated seats, and individual fares.

The system uses a predefined set of Dhaka zones and a lightweight route-compatibility model to simulate pooling decisions.

### The Scenario

The application follows a simple demonstration scenario:

- **Jashim** is the driver of a three-seat vehicle named Bullet.
- **Nusrat** requests a ride from Banani to Mohakhali.
- **Rafiq** requests a ride from Banani to Gulshan 1.
- **Shirin** is another passenger in the scenario.

When compatible requests are received, the system can assign passengers to the same vehicle while maintaining seat availability and calculating each passenger's fare independently.

---

## Core Features

### Authentication and Authorization
- Passenger and driver registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based access control.
- Protected API endpoints.

### Passenger Features
- Create ride requests.
- Select pickup and destination zones.
- Specify required seats.
- Receive fare estimates.
- Track ride status.
- View previous rides.
- Cancel eligible requests.

### Driver Features
- Register a vehicle.
- Manage online/offline availability.
- View assigned pools and their passengers.
- Accept a pool.
- Update trip progress.
- View allocated seats and passenger fares.

### Ride Pooling
- Match compatible pickup and destination zones.
- Assign multiple passengers to one vehicle.
- Maintain individual seat allocations.
- Prevent vehicle capacity from being exceeded.
- Calculate fares independently for each passenger.
- Preserve ride and status history.

### Engineering Features
- RESTful API architecture.
- Input validation using Zod.
- Relational database design using PostgreSQL.
- Database transactions for seat allocation.
- Automated tests using Vitest.
- Docker-based local development environment.

---

## How Ride Pooling Works

The system uses predefined zones and route compatibility rules instead of integrating a real-time navigation service.

### Supported Zones

The initial simulation includes:

- Banani
- Gulshan 1
- Mohakhali
- Dhanmondi
- Mirpur
- Uttara
- Farmgate
- Bashundhara

### Pooling Rules

A new ride request is evaluated using the following rules:

1. The pickup and destination zones must be valid and different.
2. The requested seat count must be at least one.
3. The system checks for an existing open pool with the same pickup zone.
4. The requested destination must be compatible with the pool's destination according to the predefined compatibility configuration.
5. The vehicle must be online and have enough remaining seats.
6. If a suitable pool exists, the passenger is assigned to it.
7. If no suitable pool exists, the system looks for an available online vehicle that is not currently handling an active trip.
8. If a vehicle is available, a new pool is created.
9. If no vehicle is available, the request remains in the `REQUESTED` state.

A pool is closed to additional requests once the driver accepts it.

### Vehicle Availability

A vehicle can be assigned to a new pool only when:

- Its driver is online.
- It does not have an active trip containing rides that are not completed or cancelled.

These rules prevent the same vehicle from being assigned to multiple new trips while it is already handling an active journey.

### Seat Allocation

Each passenger receives an individual seat allocation.

For example, in a three-seat vehicle:

| Passenger | Seats Requested | Allocated Seats |
|---|---:|---|
| Nusrat | 1 | 1 |
| Rafiq | 1 | 2 |
| Shirin | 1 | 3 |

The system checks available capacity before adding a passenger. Seat allocation is handled transactionally to protect against concurrent requests claiming the same remaining capacity.

---

## Ride Lifecycle

Each ride request follows a controlled state-transition process.

```text
REQUESTED
    |
    v
MATCHED
    |
    v
ACCEPTED
    |
    v
DRIVER_ARRIVED
    |
    v
STARTED
    |
    v
COMPLETED
```

A ride can also move to `CANCELLED` from eligible states before the trip starts.

| Status | Description |
|---|---|
| `REQUESTED` | Passenger has submitted a ride request. |
| `MATCHED` | A compatible pool and vehicle have been assigned. |
| `ACCEPTED` | Driver has accepted the pool. |
| `DRIVER_ARRIVED` | Driver has arrived at the pickup point. |
| `STARTED` | The trip has started. |
| `COMPLETED` | The trip has been completed. |
| `CANCELLED` | The ride request has been cancelled. |

The driver performs pool-level actions for accepting, arriving, starting, and completing a shared trip. These actions update the corresponding non-cancelled ride requests together, keeping the shared trip lifecycle consistent.

Every status change is recorded in the ride status history.

---

## Fare Calculation

The application uses a simple, configurable fare model.

The fare consists of:

- A base fare.
- A distance-based charge.
- A pooling discount.

### Configuration

| Parameter | Value |
|---|---:|
| Base fare | 3,000 paisa |
| Distance rate | 50 paisa per 100 metres |
| Pool discount | 15% |

### Formula

```text
Distance Charge =
ceil(Distance in metres / 100) × 50

Standard Fare =
Base Fare + Distance Charge

Pooled Fare =
Standard Fare × (1 - Pool Discount)
```

All monetary values are stored as integer paisa to avoid floating-point precision issues.

Rounding uses the nearest integer with half-up rounding.

### Example

| Passenger | Route | Distance | Standard Fare | Pooled Fare |
|---|---|---:|---:|---:|
| Nusrat | Banani → Mohakhali | 4,200 m | 5,100 paisa | 4,335 paisa |
| Rafiq | Banani → Gulshan 1 | 3,100 m | 4,550 paisa | 3,868 paisa |

Each passenger pays an individual fare based on their own route distance. Pooling does not mean that passengers split one shared fare equally.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | JWT, bcrypt |
| Validation | Zod |
| Testing | Vitest |
| Containerization | Docker, Docker Compose |
| Frontend Hosting | Vercel |

---

## System Architecture

The application follows a client-server architecture with a separate frontend, backend API, and relational database.

```mermaid
flowchart TD
    A[Passenger / Driver] --> B[Next.js Frontend]
    B --> C[Express REST API]
    C --> D[Authentication Middleware]
    D --> E[Business Logic]
    E --> F[Prisma ORM]
    F --> G[(PostgreSQL)]
```

### Architecture Responsibilities

**Next.js Frontend**
- Provides passenger and driver interfaces.
- Handles user interactions and API communication.
- Displays ride details, fares, and trip status.

**Express API**
- Handles authentication and authorization.
- Validates incoming requests.
- Implements ride pooling and fare calculation.
- Controls ride status transitions.
- Enforces vehicle capacity and business rules.

**PostgreSQL**
- Stores users, vehicles, pools, ride requests, memberships, and status history.
- Maintains relational integrity between application entities.

**Prisma ORM**
- Handles database queries and transactions.
- Defines the database schema.
- Manages database migrations.

---

## Database Design

The database is designed around the relationships between users, vehicles, pools, and ride requests.

### Main Entities

| Entity | Responsibility |
|---|---|
| `User` | Stores passenger and driver accounts. |
| `Vehicle` | Stores driver-owned vehicle information and capacity. |
| `Pool` | Represents a shared trip assigned to a vehicle. |
| `RideRequest` | Stores individual passenger ride requests. |
| `PoolMember` | Connects ride requests to pools and stores seat allocation and individual fare. |
| `RideStatusHistory` | Records the status changes of each ride request. |

### Key Relationships

- A driver can own one vehicle.
- A vehicle can have multiple pools over time.
- A pool belongs to one vehicle.
- A pool can contain multiple passenger ride requests.
- A passenger can create multiple ride requests.
- Each ride request can belong to one pool.
- Each ride request can have multiple status history records.

The database uses relational constraints, unique fields, indexes, and appropriate data types to maintain consistency.

**Entity Relationship Diagram**

![Database ERD](docs/images/erd.png)

See [Database Design](docs/erd.md) for additional details.

---

## API Overview

The backend exposes RESTful endpoints for authentication, passenger operations, driver operations, and ride management.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Check API health. |
| `POST` | `/auth/register` | Register a user. |
| `POST` | `/auth/login` | Authenticate a user. |
| `POST` | `/rides` | Create a ride request. |
| `GET` | `/rides/:id` | Retrieve ride details. |
| `GET` | `/rides/history` | Retrieve passenger ride history. |
| `POST` | `/rides/:id/cancel` | Cancel an eligible ride. |
| `POST` | `/vehicles` | Register a driver vehicle. |
| `PATCH` | `/vehicles/:id/status` | Update vehicle availability. |
| `GET` | `/vehicles/:id/requests` | View the vehicle's assigned pools and requests. |
| `POST` | `/vehicles/:vehicleId/pools/:poolId/accept` | Accept a ride pool. |
| `PATCH` | `/pools/:poolId/status` | Update the shared trip status. |

All protected endpoints require a valid JWT. Role and resource ownership checks are applied where necessary.

---

## Project Structure

```text
dhaka-tesla-pool/
│
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── middleware/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── rides/
│   │   │   │   ├── vehicles/
│   │   │   │   └── pools/
│   │   │   ├── services/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── lib/
│       └── package.json
│
├── docs/
│   ├── images/
│   │   └── erd.png
│   ├── architecture.md
│   └── erd.md
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js 20 or later
- npm
- PostgreSQL, or Docker Desktop
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/dhaka-tesla-pool.git

cd dhaka-tesla-pool
```

### 2. Configure Environment Variables

Create environment files using the provided examples.

```bash
cp .env.example .env
```

Configure the database connection, JWT secret, and frontend API URL.

### 3. Install Dependencies

Install dependencies in the API and frontend directories.

```bash
cd apps/api
npm install

cd ../web
npm install
```

### 4. Set Up the Database

Make sure PostgreSQL is running and the `DATABASE_URL` points to your database.

From the API directory, run:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

For local development when creating new migrations, use:

```bash
npx prisma migrate dev
```

### 5. Start the Backend

From `apps/api`:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

### 6. Start the Frontend

From `apps/web`:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

Use `.env.example` as the reference for the required configuration.

Example:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/dhaka_tesla_pool"

# Authentication
JWT_SECRET="replace-with-a-secure-random-secret"

# API
PORT=5000
NODE_ENV=development

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

Never commit real credentials or production secrets to the repository.

---

## Running with Docker

Docker Compose provides a consistent environment for running the frontend, backend, and PostgreSQL database.

Make sure Docker Desktop is running and the environment variables are configured.

Start the application:

```bash
docker compose up --build
```

Stop the application:

```bash
docker compose down
```

To stop the application and remove the database volume:

```bash
docker compose down -v
```

**Note:** Removing the database volume deletes the local database data.

---

## Testing

The backend uses Vitest for unit and integration testing.

Run the test suite from the API directory:

```bash
npm test
```

The important test cases include:

- Fare calculation for solo and pooled rides.
- Correct seat allocation.
- Vehicle capacity enforcement.
- Concurrent requests attempting to claim the remaining seats.
- Ride cancellation rules.
- Valid and invalid ride status transitions.
- Driver ownership and passenger authorization.
- Pool matching for compatible routes.
- Handling requests when no vehicle is available.

The tests focus on business logic, data consistency, and access control rather than only checking whether API endpoints respond successfully.

---

## Demo Scenario

The demonstration follows the Dhaka ride-pooling scenario.

1. Jashim logs in as a driver and registers Bullet with a capacity of three seats.
2. Jashim switches the vehicle to online.
3. Nusrat registers and requests a ride from Banani to Mohakhali.
4. The system creates a pool and assigns Nusrat to the vehicle.
5. Rafiq requests a ride from Banani to Gulshan 1.
6. The system checks route compatibility and available capacity, then assigns Rafiq to the existing pool.
7. Jashim views the pool and accepts it.
8. The driver updates the shared trip status as the journey progresses.
9. Passengers can view their individual fares and ride status.
10. The system maintains the status history and individual ride records.

The scenario demonstrates how separate ride requests can be managed as one shared trip while preserving individual passenger information.

---

## Key Engineering Decisions

### 1. Predefined Zones Instead of Real-Time Routing

The project uses a small set of Dhaka zones, predefined distances, and route compatibility rules.

This keeps the MVP focused on ride-pooling logic rather than external mapping services.

### 2. Separate Ride Requests and Pools

A pool represents the shared vehicle trip, while each ride request represents an individual passenger's journey.

This allows multiple passengers to share a vehicle without losing their individual fare, seat allocation, or ride status.

### 3. Transactional Seat Allocation

Seat availability must be checked again during the database transaction.

This helps prevent concurrent requests from exceeding the vehicle's capacity or claiming the same seats.

### 4. Individual Fare Calculation

Each passenger's fare is calculated using their own route distance and the pooling discount.

All monetary values are stored as integer paisa.

### 5. Controlled Status Transitions

Ride statuses follow a predefined lifecycle. Invalid transitions are rejected, and valid changes are recorded in the status history.

### 6. Simple MVP Architecture

The application uses a frontend, a backend API, and a relational database.

The architecture avoids unnecessary distributed infrastructure while keeping the main business logic separated into manageable modules.

---

## AI Usage

AI-assisted development tools were used during the development process for:

- Exploring implementation approaches.
- Understanding framework and library documentation.
- Reviewing code structure and identifying potential edge cases.
- Assisting with debugging and test-case design.

Tools used: ChatGPT, GitHub Copilot, and official documentation.

AI-generated suggestions were reviewed and tested before being incorporated. Implementation decisions were made based on the project's requirements, consistency, and maintainability.

**Accepted suggestion:** [Add a specific suggestion you accepted and how it improved the implementation.]

**Rejected or modified suggestion:** [Add a specific suggestion you rejected or changed and explain why.]

All implemented functionality should be explainable and maintainable by the developer.

---

## Limitations and Future Improvements

The current application focuses on demonstrating the core ride-pooling workflow.

Potential improvements include:

- Real-time maps and route-distance calculation.
- More advanced route-overlap and pickup-order optimization.
- Automatic matching of pending requests when a driver becomes available.
- Real-time ride updates using WebSockets.
- Payment gateway integration.
- Passenger and driver ratings.
- More comprehensive handling of cancellations and driver availability.
- Load testing and performance optimization for larger numbers of users.

---

## Author

**Sadia Akter**

Computer Science and Engineering

- GitHub: [github.com/sadiaprity](https://github.com/sadiaprity)
- LinkedIn: [linkedin.com/in/sadia-akhter-prity](https://linkedin.com/in/sadia-akhter-prity)

---

*Dhaka Tesla Pool is a technical task for Robendevs. It does not provide real-world transportation or process actual payments.*
