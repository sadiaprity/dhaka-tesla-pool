| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| POST | /auth/register | Public | Register a new user |
| POST | /auth/login | Public | Log in, returns JWT |
| POST | /rides | Passenger | Create and match a ride request |
| GET | /rides/:id | Owner or pool driver | Read one ride request |
| POST | /rides/:id/cancel | Owning passenger | Cancel a cancellable ride and release seats |
| GET | /rides/history?limit=20&offset=0 | Passenger | List own ride requests and status history |
| POST | /vehicles | Driver | Register a vehicle (one per driver) |
| GET | /vehicles/me | Driver | Get the authenticated driver's vehicle |
| PATCH | /vehicles/:id/status | Driver (owner) | Toggle online/offline |
| GET | /vehicles/:id/requests | Driver (owner) | List this vehicle's pools and active members |
| GET | /vehicles/:id/history?limit=20&offset=0 | Driver (owner) | List this vehicle's pools and ride history |
| POST | /vehicles/:vehicleId/pools/:poolId/accept | Driver (owner) | Accept a pool |
| POST | /vehicles/:vehicleId/pools/:poolId/driver-arrived | Driver (owner) | Mark the driver arrived |
| POST | /vehicles/:vehicleId/pools/:poolId/start | Driver (owner) | Start the trip |
| POST | /vehicles/:vehicleId/pools/:poolId/complete | Driver (owner) | Complete the trip |
| POST | /vehicles/:vehicleId/pools/:poolId/advance | Driver (owner) | Generic compatible pool transition |

History endpoints return `{ items, total, limit, offset }`. `limit` defaults to 20 and must be between 1 and 100; `offset` defaults to 0 and must be non-negative.