| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| POST | /auth/register | Public | Register a new user |
| POST | /auth/login | Public | Log in, returns JWT |
| POST | /vehicles | Driver | Register a vehicle |
| PATCH | /vehicles/:id/status | Driver (owner) | Toggle online/offline |
| POST | /vehicles/:vehicleId/pools/:poolId/advance | Driver (owner) | Advance pool through trip states |
| GET | /vehicles/:id/requests | Driver (owner) | List pools/requests for this vehicle |