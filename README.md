# Dhaka Tesla Pool

A full-stack ride-pooling application that allows passengers to request rides, automatically match compatible requests into shared pools, and allows drivers to manage pooled trips through a simple driver dashboard.

The project demonstrates authentication, role-based access control, ride matching, seat management, fare calculation, cancellation handling, driver trip states, ride history, and persistent data storage.

---

## 1. Project Overview

Dhaka Tesla Pool is designed around a simple idea:

> Multiple passengers with compatible routes can share the same Tesla instead of requiring separate rides.

The application has two types of users:

* **Passenger** — requests rides, views ride status, cancels eligible rides, and views ride history.
* **Driver** — manages an online vehicle, views pooled ride requests, accepts pools, and moves trips through their lifecycle.

### Example

Nusrat requests:

**Banani → Mohakhali**

Rafiq requests the same compatible route.

If a vehicle has enough available capacity, both requests can be placed into the same pool.

The driver can then manage the shared trip as one journey.

---

## 2. Main Features

### Passenger

* Register and log in
* Select pickup and destination zones
* Request one or more seats
* Receive calculated fare
* Automatically join a compatible existing pool when capacity is available
* View current ride status
* Cancel an eligible ride
* View ride history
* See final fare and ride status

### Driver

* Register a vehicle
* Set vehicle online/offline
* View active pooled requests
* See passengers and assigned seats
* Accept a pool
* Mark driver as arrived
* Start the trip
* Complete the trip
* View previous ride history

### System

* JWT authentication
* Role-based authorization
* Route compatibility checking
* Vehicle capacity management
* Seat assignment
* Pool-level driver actions
* Fare calculation
* Pool discount
* Transaction-safe cancellation
* Ride status history
* PostgreSQL persistence
* Prisma ORM
* REST API
* Responsive web interface

---

## 3. Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* JWT
* Zod
* bcrypt

### Database

* PostgreSQL

### Testing

* Vitest

### Infrastructure

* Docker
* Docker Compose

---

## 4. Architecture

```text
                    ┌─────────────────────┐
                    │      Passenger      │
                    │       Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express + Node.js  │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                            Prisma
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
                               ▲
                               │
                    ┌──────────┴──────────┐
                    │       Driver        │
                    │       Browser       │
                    └─────────────────────┘
```

The frontend communicates with the Express API through HTTP requests.

The backend handles authentication, authorization, ride matching, pooling, fare calculation, and business rules.

Prisma communicates with PostgreSQL and provides the database access layer.

---

## 5. Project Structure

```text
dhaka-tesla-pool/
│
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   │
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── ...
│   │   │
│   │   ├── tests/
│   │   ├── package.json
│   │   └── .env
│   │
│   └── web/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── package.json
│       └── ...
│
├── docs/
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

# 6. Database Design

The main database entities are:

### User

Stores passengers and drivers.

```text
User
├── id
├── name
├── email
├── passwordHash
├── role
└── createdAt
```

Roles:

```text
PASSENGER
DRIVER
```

### Vehicle

Represents a driver's vehicle.

```text
Vehicle
├── id
├── driverId
├── capacity
└── isOnline
```

A driver can have one registered vehicle.

### Pool

Represents a shared vehicle trip.

```text
Pool
├── id
├── vehicleId
├── pickupZone
├── destinationZone
├── status
└── createdAt
```

Pool status:

```text
OPEN
CLOSED
```

### RideRequest

Represents an individual passenger's ride request.

```text
RideRequest
├── id
├── passengerId
├── pickupZone
├── destinationZone
├── seatsRequested
├── status
└── createdAt
```

### PoolMember

Connects a ride request to a pool.

It stores:

* requested seats
* assigned seat numbers
* calculated fare
* whether the passenger is still active in the pool

```text
PoolMember
├── id
├── poolId
├── rideRequestId
├── seatsRequested
├── seatNumbers
├── farePaisa
└── isActive
```

### RideStatusHistory

Stores every ride status change instead of overwriting the history.

```text
RideStatusHistory
├── id
├── rideRequestId
├── status
└── changedAt
```

This means a completed or cancelled ride remains traceable.

---

# 7. Ride Lifecycle

A passenger ride follows this lifecycle:

```text
REQUESTED
    │
    ▼
MATCHED
    │
    ▼
ACCEPTED
    │
    ▼
DRIVER_ARRIVED
    │
    ▼
STARTED
    │
    ▼
COMPLETED
```

A ride can also become:

```text
CANCELLED
```

when the passenger cancels before the trip has started.

### Meaning of the states

**REQUESTED**

The passenger has created a ride request.

**MATCHED**

The system has successfully assigned the request to a compatible pool/vehicle.

**ACCEPTED**

The driver has accepted the pool.

**DRIVER_ARRIVED**

The driver has arrived at the pickup point.

**STARTED**

The trip has started.

**COMPLETED**

The trip has finished.

**CANCELLED**

The passenger cancelled the ride before the trip started.

---

# 8. Pooling Logic

The system attempts to reuse an existing compatible pool before creating a new vehicle assignment.

A request can join an existing pool when:

1. The route is compatible.
2. The vehicle is online.
3. The vehicle has enough available seats.
4. The pool does not contain an active incompatible trip.
5. The passenger's requested seats fit within the remaining capacity.

If no suitable pool exists, the system looks for another available online vehicle.

If no vehicle is available, the request remains:

```text
REQUESTED
```

and the API reports that no driver is currently available.

---

# 9. Vehicle Capacity

The system tracks seats individually.

For example, a vehicle with capacity 3 may have:

```text
Seat 1 → Nusrat
Seat 2 → Rafiq
Seat 3 → Empty
```

If Nusrat cancels:

```text
Seat 1 → Empty
Seat 2 → Rafiq
Seat 3 → Empty
```

The cancelled passenger's membership becomes inactive, but the ride itself remains in the database for history.

This allows another compatible passenger to use the released capacity when the system permits it.

---

# 10. Cancellation Handling

Cancellation is handled inside a database transaction.

When a passenger cancels:

```text
RideRequest
    ↓
CANCELLED

PoolMember
    ↓
isActive = false
```

Both changes happen together.

The PoolMember is not deleted.

This preserves the relationship and historical information while immediately freeing the passenger's seats.

A passenger can only cancel their own ride, and cancellation is not allowed after the trip has started.

---

# 11. Driver Trip Management

Driver actions are intentionally handled at the **pool level**.

The driver operates the shared vehicle as one journey, so the driver does not separately start or complete each passenger's trip.

The lifecycle is:

```text
Accept Pool
     ↓
Driver Arrived
     ↓
Start Trip
     ↓
Complete Trip
```

When a pool action is performed, the system updates the active eligible rides inside that pool.

Cancelled/inactive members are skipped.

---

# 12. Fare Calculation

The application calculates fares using:

```text
Base Fare = 3000 paisa
Distance Rate = 50 paisa per 100 meters
Pool Discount = 15%
```

The distance charge is calculated as:

```text
ceil(distance / 100) × 50
```

The standard fare is then calculated from the base fare plus the distance charge.

For pooled rides, a 15% discount is applied.

### Example

For:

```text
Banani → Mohakhali
```

The configured distance is:

```text
4,200 meters
```

The resulting fares are:

```text
Standard fare: 5100 paisa
Pooled fare:   4335 paisa
```

For:

```text
Banani → Gulshan 1
```

the configured fares are:

```text
Standard fare: 4550 paisa
Pooled fare:   3868 paisa
```

The application stores fares in **paisa as integers** rather than floating-point currency values.

---

# 13. Supported Zones

The current application includes:

```text
Banani
Gulshan 1
Mohakhali
Dhanmondi
Mirpur
Uttara
Farmgate
Bashundhara
```

Compatible routes are configured in the backend.

For example:

```text
Banani → Mohakhali
Banani → Gulshan 1
```

are configured as compatible routes.

The route configuration can be extended later as additional zones and route combinations are added.

---

# 14. Authentication and Authorization

Authentication uses JWT.

The general flow is:

```text
Login
  ↓
Backend validates credentials
  ↓
JWT generated
  ↓
Frontend stores token
  ↓
Token sent with protected API requests
  ↓
Backend verifies token
```

Passwords are stored as bcrypt hashes rather than plain text.

The API also checks the user's role before allowing protected operations.

### Passenger-only operations

* Create ride
* Cancel own ride
* View own ride history

### Driver-only operations

* Register vehicle
* Change vehicle online status
* View vehicle requests
* Manage pools
* Accept / arrive / start / complete trips
* View driver ride history

A driver cannot access another driver's vehicle operations.

A passenger cannot perform driver operations.

---

# 15. API Endpoints

Base API URL:

```text
http://localhost:4000
```

## Authentication

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

---

## Passenger Ride APIs

### Create Ride

```http
POST /rides
```

### Get Ride

```http
GET /rides/:id
```

### Cancel Ride

```http
POST /rides/:id/cancel
```

### Ride History

```http
GET /rides/history
```

---

## Vehicle APIs

### Register Vehicle

```http
POST /vehicles
```

### Change Vehicle Status

```http
PATCH /vehicles/:id/status
```

### View Vehicle Requests

```http
GET /vehicles/:id/requests
```

### Vehicle History

```http
GET /vehicles/:id/history
```

---

## Driver Pool APIs

### Accept Pool

```http
POST /vehicles/:vehicleId/pools/:poolId/accept
```

### Driver Arrived

```http
POST /vehicles/:vehicleId/pools/:poolId/driver-arrived
```

### Start Trip

```http
POST /vehicles/:vehicleId/pools/:poolId/start
```

### Complete Trip

```http
POST /vehicles/:vehicleId/pools/:poolId/complete
```

All protected endpoints require a valid JWT.

---

# 16. Demo Accounts

The development seed creates the following users:

| Name   | Role      | Email                |
| ------ | --------- | -------------------- |
| Jashim | Driver    | `jashim@example.com` |
| Nusrat | Passenger | `nusrat@example.com` |
| Rafiq  | Passenger | `rafiq@example.com`  |
| Shirin | Passenger | `shirin@example.com` |

The seeded demo password is:

```text
pass1234
```

Jashim's seeded vehicle is:

```text
Bullet
Capacity: 3
Status: Online
```

`Bullet` is a demo/UI label for the seeded vehicle.

---

# 17. Requirements

Before running the project, install:

* Node.js
* npm
* Docker Desktop

PostgreSQL can be run through Docker Compose.

Recommended environment:

```text
Node.js 20+
npm 10+
Docker Desktop
```

---

# 18. Installation

Clone the repository:

```bash
git clone <repository-url>
cd dhaka-tesla-pool
```

Install backend dependencies:

```bash
cd apps/api
npm install
```

Install frontend dependencies:

```bash
cd ../web
npm install
```

Return to the project root:

```bash
cd ../..
```

---

# 19. Environment Variables

Create:

```text
apps/api/.env
```

with the required database and authentication configuration.

Example:

```env
DATABASE_URL="postgresql://tesla:tesla_password@localhost:5433/dhaka_tesla_pool"
JWT_SECRET="change-this-in-development"
PORT=4000
```

The frontend should use the configured API URL, for example:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Do not commit real secrets or production credentials to Git.

---

# 20. Start PostgreSQL with Docker

From the project root:

```bash
docker compose up -d postgres
```

Check the database container:

```bash
docker ps
```

Check PostgreSQL readiness:

```bash
docker exec tesla-pg pg_isready -U tesla -d dhaka_tesla_pool
```

Expected result:

```text
accepting connections
```

If Docker Desktop is not running, start Docker Desktop first and wait until the Docker Engine is ready.

---

# 21. Set Up the Database

Go to the API directory:

```bash
cd apps/api
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma migrate dev
```

Run the seed:

```bash
npx prisma db seed
```

The seed is designed to be idempotent, so running it again does not create duplicate demo users or vehicles.

---

# 22. Run the Backend

From:

```text
apps/api
```

run:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:4000
```

---

# 23. Run the Frontend

Open another terminal.

Go to:

```bash
cd apps/web
```

Run:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:3000
```

Open:

```text
http://localhost:3000
```

in a browser.

---

# 24. Running the Project

Once both servers are running:

```text
PostgreSQL
    ↓
Express API :4000
    ↓
Next.js Web :3000
    ↓
Browser
```

You can now use the application through the browser.

---

# 25. Example Demo Flow

A simple end-to-end demonstration is:

### Step 1 — Passenger 1

Log in as:

```text
nusrat@example.com
```

Request:

```text
Pickup: Banani
Destination: Mohakhali
Seats: 1
```

The backend creates the ride and attempts to match it with an available vehicle/pool.

---

### Step 2 — Passenger 2

Log in as:

```text
rafiq@example.com
```

Request the same compatible route:

```text
Pickup: Banani
Destination: Mohakhali
Seats: 1
```

If capacity is available, the request joins the existing pool.

---

### Step 3 — Driver

Log in as:

```text
jashim@example.com
```

The driver dashboard shows the vehicle and active pool.

The driver can see:

* Pool route
* Passengers
* Occupied seats
* Available seats
* Passenger fares

---

### Step 4 — Accept

The driver accepts the pool.

The active rides move to:

```text
ACCEPTED
```

---

### Step 5 — Cancellation Edge Case

Before the trip starts, Nusrat cancels her ride.

Her ride becomes:

```text
CANCELLED
```

Her PoolMember becomes inactive and her seat is released.

Rafiq's ride remains active.

---

### Step 6 — Continue Trip

The driver can then move the active pool through:

```text
DRIVER_ARRIVED
        ↓
STARTED
        ↓
COMPLETED
```

---

### Step 7 — History

After completion, the passenger can view the ride in ride history.

Cancelled rides also remain visible in history.

---

# 26. Testing

Backend unit and integration tests are located in:

```text
apps/api/tests
```

Run the test suite:

```bash
cd apps/api
npx vitest run
```

The test suite covers areas including:

* Fare calculation
* Vehicle capacity
* Concurrent ride matching
* Cancellation
* No available vehicle handling

The integration tests require PostgreSQL to be running and reachable through the configured `DATABASE_URL`.

---

# 27. Production Builds

Build the API:

```bash
cd apps/api
npm run build
```

Build the frontend:

```bash
cd ../web
npm run build
```

---

# 28. Docker

The project includes Docker Compose configuration for the PostgreSQL database and local development infrastructure.

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Stop the services:

```bash
docker compose down
```

If Docker Desktop reports an engine or `_ping` error, restart Docker Desktop and wait for the Linux engine to become ready before running the command again.

---

# 29. Important Business Rules

The application follows several rules to keep ride and pool state consistent.

### Rule 1 — No unnecessary vehicle assignment

A new vehicle is only considered when it is online and does not already contain an active trip.

### Rule 2 — Pool compatibility

Passengers can share a pool only when their routes satisfy the configured compatibility rules.

### Rule 3 — Capacity

The total active seats in a pool cannot exceed the vehicle capacity.

### Rule 4 — Cancellation

Passengers can cancel only their own ride and only before the ride starts.

### Rule 5 — History preservation

Cancelled and completed rides are never deleted from ride history.

### Rule 6 — Driver ownership

A driver can only manage their own registered vehicle and its pools.

### Rule 7 — Pool-level driver actions

Accept, arrive, start, and complete actions operate on the pool rather than independently on each passenger.

---

# 30. API Security

The backend applies authorization checks to protected resources.

For example:

* A passenger cannot access another passenger's ride.
* A passenger cannot manage a vehicle.
* A driver cannot manage another driver's vehicle.
* A passenger can cancel only their own ride.
* Passwords are never stored directly.
* JWTs are required for protected endpoints.

---

# 31. Design Decisions

### Why PostgreSQL?

The application contains strongly related entities such as users, vehicles, pools, rides, pool members, and ride history.

PostgreSQL provides relational constraints and transactional behavior that are useful for operations such as seat allocation and cancellation.

### Why Prisma?

Prisma provides typed database access for TypeScript and makes the relationship-heavy data model easier to work with.

### Why JWT?

JWT provides a simple stateless authentication mechanism for the REST API.

### Why pool-level driver actions?

A driver operates the shared vehicle as a single trip. Handling the operational state at the pool level avoids inconsistent situations where passengers in the same vehicle have different driver-side trip states.

### Why keep cancelled pool members?

Deleting a cancelled membership would make historical relationships harder to trace.

Instead, the application marks the membership inactive while preserving the record.

---

# 32. Known Scope

This project is an assessment/MVP implementation rather than a production ride-sharing platform.

The current implementation focuses on:

* Core ride pooling
* Passenger and driver workflows
* Capacity management
* Fare calculation
* Authentication
* Authorization
* Cancellation
* Ride lifecycle
* Persistent history

Possible future improvements include:

* Real geographic routing
* GPS/live driver tracking
* Real-time WebSocket updates
* Payment integration
* Notifications
* More advanced route compatibility
* Production deployment
* Administrative dashboards
* Dynamic pricing

---

# 33. Quick Start

For someone who simply wants to run the project:

### Terminal 1 — Database

From the project root:

```bash
docker compose up -d postgres
```

### Terminal 2 — Backend

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Terminal 3 — Frontend

```bash
cd apps/web
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

Use the seeded accounts from the **Demo Accounts** section to try the passenger and driver workflows.

---

# 34. Project Flow at a Glance

```text
Passenger Login
      ↓
Request Ride
      ↓
Route + Capacity Check
      ↓
┌─────────────────────┐
│ Compatible Pool?    │
└─────────┬───────────┘
          │
     Yes  │  No
          │
          ▼
   Existing Pool     Find Vehicle
          │               │
          └───────┬───────┘
                  ↓
                MATCHED
                  ↓
            Driver Accepts
                  ↓
              ACCEPTED
                  ↓
           Driver Arrives
                  ↓
           DRIVER_ARRIVED
                  ↓
             Start Trip
                  ↓
               STARTED
                  ↓
           Complete Trip
                  ↓
             COMPLETED
                  ↓
              History
```

Cancellation can occur before the trip starts:

```text
MATCHED / ACCEPTED
        ↓
     CANCELLED
        ↓
Seat Released
        ↓
History Preserved
```

---

# 35. Summary

Dhaka Tesla Pool is a full-stack ride-pooling system built around a simple shared-vehicle workflow.

It demonstrates:

* Passenger and driver authentication
* JWT-based authorization
* Ride creation
* Route compatibility
* Automatic pool matching
* Multi-seat capacity management
* Fare calculation
* Pool discounts
* Driver trip lifecycle
* Transaction-safe cancellation
* Persistent ride history
* REST APIs
* PostgreSQL data modeling
* Prisma ORM
* Next.js frontend
* Express backend
* Automated tests

The project is structured so that the core pooling logic and business rules remain in the backend while the frontend provides separate, straightforward workflows for passengers and drivers.
