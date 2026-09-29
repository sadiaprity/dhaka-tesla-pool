```mermaid
flowchart LR
    Browser[Browser]
    Frontend[Next.js Frontend]
    API["Node.js/Express API"]
    Database[(PostgreSQL Database)]
    Note["Auth<br/>Ride matching<br/>Fare calculation"]

    Browser --> Frontend --> API --> Database
    API -.- Note

    classDef browserStyle stroke:#38bdf8,fill:#f0f9ff
    classDef frontendStyle stroke:#a78bfa,fill:#f5f3ff
    classDef apiStyle stroke:#fb923c,fill:#fff7ed
    classDef dbStyle stroke:#4ade80,fill:#f0fdf4
    classDef annotationStyle stroke:#818cf8,fill:#eef2ff,stroke-dasharray: 5 5

    class Browser browserStyle
    class Frontend frontendStyle
    class API apiStyle
    class Database dbStyle
    class Note annotationStyle
```
![architecture](./images/architecture.png)

## Pooling rule:
 two ride requests may share a Pool when they have the same pickup zone AND both destination zones appear in the compatible-destinations list configured for that pickup zone.

## New-vehicle rule:
 a vehicle is available to start a brand-new Pool only if it is online AND has no Pool containing a RideRequest whose status is not COMPLETED or CANCELLED.

## Seat release rule:
 cancelling a RideRequest sets its PoolMember.isActive to false; capacity calculations only ever sum isActive = true members, so a cancelled passenger's seat becomes available to a new request immediately.