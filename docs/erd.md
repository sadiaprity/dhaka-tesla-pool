```mermaid
erDiagram
    USER ||--o| VEHICLE : drives
    VEHICLE ||--o{ POOL : hosts
    USER ||--o{ RIDEREQUEST : creates
    POOL ||--o{ POOLMEMBER : includes
    RIDEREQUEST ||--o| POOLMEMBER : joins_as
    RIDEREQUEST ||--o{ RIDESTATUSHISTORY : records

    USER {
        int id PK
        string name
        string email
        string passwordHash
        string role "PASSENGER|DRIVER"
        datetime createdAt
    }

    VEHICLE {
        int id PK
        int driverId FK, UK
        int capacity
        boolean isOnline
    }

    POOL {
        int id PK
        int vehicleId FK
        string pickupZone
        string destinationZone
        string status "OPEN|CLOSED"
        datetime createdAt
    }

    RIDEREQUEST {
        int id PK
        int passengerId FK
        string pickupZone
        string destinationZone
        int seatsRequested
        string status "REQUESTED|MATCHED|ACCEPTED|DRIVER_ARRIVED|STARTED|COMPLETED|CANCELLED"
        datetime createdAt
    }

    POOLMEMBER {
        int id PK
        int poolId FK
        int rideRequestId FK, UK
        int seatsRequested
        int[] seatNumbers
        int farePaisa
        boolean isActive
    }

    RIDESTATUSHISTORY {
        int id PK
        int rideRequestId FK
        string status
        datetime changedAt
    }
```

![ERD](./images/erd.png)

## Why Pool carries its own pickupZone/destinationZone
The matcher needs somewhere to read an existing pool's route from when deciding if a new request can join it. Without this, a Pool would have no way to represent what trip it's actually doing.

## Why Pool and RideRequest are separate
A Pool is the shared vehicle-trip; a RideRequest is one passenger's own journey with its own status. Keeping them separate means one passenger cancelling never affects the Pool or other passengers.

## Why PoolMember has isActive
Cancelling a RideRequest sets its PoolMember.isActive to false instead of deleting the row. This releases the seat for capacity checks (a new passenger can claim it) while keeping the record intact for history/audit.