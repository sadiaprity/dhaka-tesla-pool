| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| POST | /auth/register | Public | Register a new user |
| POST | /auth/login | Public | Log in, returns JWT |
| POST | /vehicles | Driver | Register a vehicle |
| PATCH | /vehicles/:id/status | Driver (owner) | Toggle online/offline |
| GET | /rides/history?limit=20&offset=0 | Passenger | List own ride requests and status history |
| GET | /vehicles/:id/history?limit=20&offset=0 | Driver (owner) | List this vehicle's pools and ride history |
| POST | /vehicles/:vehicleId/pools/:poolId/advance | Driver (owner) | Advance pool through trip states |
| GET | /vehicles/:id/requests | Driver (owner) | List pools/requests for this vehicle |
| GET | /rides/history | Passenger | List own past ride requests |
| GET | /vehicles/:id/history | Driver (owner) | List vehicle's past pools |

History endpoints return `{ items, total, limit, offset }`. `limit` defaults to 20 and must be between 1 and 100; `offset` defaults to 0 and must be non-negative.