import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.ts';
export type * from './prismaNamespace.ts';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Vehicle: "Vehicle";
    readonly Pool: "Pool";
    readonly RideRequest: "RideRequest";
    readonly PoolMember: "PoolMember";
    readonly RideStatusHistory: "RideStatusHistory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const VehicleScalarFieldEnum: {
    readonly id: "id";
    readonly driverId: "driverId";
    readonly capacity: "capacity";
    readonly isOnline: "isOnline";
};
export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum];
export declare const PoolScalarFieldEnum: {
    readonly id: "id";
    readonly vehicleId: "vehicleId";
    readonly pickupZone: "pickupZone";
    readonly destinationZone: "destinationZone";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type PoolScalarFieldEnum = (typeof PoolScalarFieldEnum)[keyof typeof PoolScalarFieldEnum];
export declare const RideRequestScalarFieldEnum: {
    readonly id: "id";
    readonly passengerId: "passengerId";
    readonly pickupZone: "pickupZone";
    readonly destinationZone: "destinationZone";
    readonly seatsRequested: "seatsRequested";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type RideRequestScalarFieldEnum = (typeof RideRequestScalarFieldEnum)[keyof typeof RideRequestScalarFieldEnum];
export declare const PoolMemberScalarFieldEnum: {
    readonly id: "id";
    readonly poolId: "poolId";
    readonly rideRequestId: "rideRequestId";
    readonly seatsRequested: "seatsRequested";
    readonly seatNumbers: "seatNumbers";
    readonly farePaisa: "farePaisa";
    readonly isActive: "isActive";
};
export type PoolMemberScalarFieldEnum = (typeof PoolMemberScalarFieldEnum)[keyof typeof PoolMemberScalarFieldEnum];
export declare const RideStatusHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly rideRequestId: "rideRequestId";
    readonly status: "status";
    readonly changedAt: "changedAt";
};
export type RideStatusHistoryScalarFieldEnum = (typeof RideStatusHistoryScalarFieldEnum)[keyof typeof RideStatusHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map