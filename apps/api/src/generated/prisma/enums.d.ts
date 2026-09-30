export declare const UserRole: {
    readonly PASSENGER: "PASSENGER";
    readonly DRIVER: "DRIVER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const PoolStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
};
export type PoolStatus = (typeof PoolStatus)[keyof typeof PoolStatus];
export declare const RideStatus: {
    readonly REQUESTED: "REQUESTED";
    readonly MATCHED: "MATCHED";
    readonly ACCEPTED: "ACCEPTED";
    readonly DRIVER_ARRIVED: "DRIVER_ARRIVED";
    readonly STARTED: "STARTED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];
//# sourceMappingURL=enums.d.ts.map