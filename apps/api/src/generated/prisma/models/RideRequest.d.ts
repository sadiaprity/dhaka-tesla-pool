import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.ts";
import type * as Prisma from "../internal/prismaNamespace.ts";
/**
 * Model RideRequest
 *
 */
export type RideRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$RideRequestPayload>;
export type AggregateRideRequest = {
    _count: RideRequestCountAggregateOutputType | null;
    _avg: RideRequestAvgAggregateOutputType | null;
    _sum: RideRequestSumAggregateOutputType | null;
    _min: RideRequestMinAggregateOutputType | null;
    _max: RideRequestMaxAggregateOutputType | null;
};
export type RideRequestAvgAggregateOutputType = {
    seatsRequested: number | null;
};
export type RideRequestSumAggregateOutputType = {
    seatsRequested: number | null;
};
export type RideRequestMinAggregateOutputType = {
    id: string | null;
    passengerId: string | null;
    pickupZone: string | null;
    destinationZone: string | null;
    seatsRequested: number | null;
    status: $Enums.RideStatus | null;
    createdAt: Date | null;
};
export type RideRequestMaxAggregateOutputType = {
    id: string | null;
    passengerId: string | null;
    pickupZone: string | null;
    destinationZone: string | null;
    seatsRequested: number | null;
    status: $Enums.RideStatus | null;
    createdAt: Date | null;
};
export type RideRequestCountAggregateOutputType = {
    id: number;
    passengerId: number;
    pickupZone: number;
    destinationZone: number;
    seatsRequested: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type RideRequestAvgAggregateInputType = {
    seatsRequested?: true;
};
export type RideRequestSumAggregateInputType = {
    seatsRequested?: true;
};
export type RideRequestMinAggregateInputType = {
    id?: true;
    passengerId?: true;
    pickupZone?: true;
    destinationZone?: true;
    seatsRequested?: true;
    status?: true;
    createdAt?: true;
};
export type RideRequestMaxAggregateInputType = {
    id?: true;
    passengerId?: true;
    pickupZone?: true;
    destinationZone?: true;
    seatsRequested?: true;
    status?: true;
    createdAt?: true;
};
export type RideRequestCountAggregateInputType = {
    id?: true;
    passengerId?: true;
    pickupZone?: true;
    destinationZone?: true;
    seatsRequested?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type RideRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RideRequest to aggregate.
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideRequests to fetch.
     */
    orderBy?: Prisma.RideRequestOrderByWithRelationInput | Prisma.RideRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RideRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RideRequests
    **/
    _count?: true | RideRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RideRequestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RideRequestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RideRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RideRequestMaxAggregateInputType;
};
export type GetRideRequestAggregateType<T extends RideRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateRideRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRideRequest[P]> : Prisma.GetScalarType<T[P], AggregateRideRequest[P]>;
};
export type RideRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RideRequestWhereInput;
    orderBy?: Prisma.RideRequestOrderByWithAggregationInput | Prisma.RideRequestOrderByWithAggregationInput[];
    by: Prisma.RideRequestScalarFieldEnum[] | Prisma.RideRequestScalarFieldEnum;
    having?: Prisma.RideRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RideRequestCountAggregateInputType | true;
    _avg?: RideRequestAvgAggregateInputType;
    _sum?: RideRequestSumAggregateInputType;
    _min?: RideRequestMinAggregateInputType;
    _max?: RideRequestMaxAggregateInputType;
};
export type RideRequestGroupByOutputType = {
    id: string;
    passengerId: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status: $Enums.RideStatus;
    createdAt: Date;
    _count: RideRequestCountAggregateOutputType | null;
    _avg: RideRequestAvgAggregateOutputType | null;
    _sum: RideRequestSumAggregateOutputType | null;
    _min: RideRequestMinAggregateOutputType | null;
    _max: RideRequestMaxAggregateOutputType | null;
};
export type GetRideRequestGroupByPayload<T extends RideRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RideRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RideRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RideRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RideRequestGroupByOutputType[P]>;
}>>;
export type RideRequestWhereInput = {
    AND?: Prisma.RideRequestWhereInput | Prisma.RideRequestWhereInput[];
    OR?: Prisma.RideRequestWhereInput[];
    NOT?: Prisma.RideRequestWhereInput | Prisma.RideRequestWhereInput[];
    id?: Prisma.StringFilter<"RideRequest"> | string;
    passengerId?: Prisma.StringFilter<"RideRequest"> | string;
    pickupZone?: Prisma.StringFilter<"RideRequest"> | string;
    destinationZone?: Prisma.StringFilter<"RideRequest"> | string;
    seatsRequested?: Prisma.IntFilter<"RideRequest"> | number;
    status?: Prisma.EnumRideStatusFilter<"RideRequest"> | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFilter<"RideRequest"> | Date | string;
    passenger?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    member?: Prisma.XOR<Prisma.PoolMemberNullableScalarRelationFilter, Prisma.PoolMemberWhereInput> | null;
    history?: Prisma.RideStatusHistoryListRelationFilter;
};
export type RideRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    passengerId?: Prisma.SortOrder;
    pickupZone?: Prisma.SortOrder;
    destinationZone?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    passenger?: Prisma.UserOrderByWithRelationInput;
    member?: Prisma.PoolMemberOrderByWithRelationInput;
    history?: Prisma.RideStatusHistoryOrderByRelationAggregateInput;
};
export type RideRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RideRequestWhereInput | Prisma.RideRequestWhereInput[];
    OR?: Prisma.RideRequestWhereInput[];
    NOT?: Prisma.RideRequestWhereInput | Prisma.RideRequestWhereInput[];
    passengerId?: Prisma.StringFilter<"RideRequest"> | string;
    pickupZone?: Prisma.StringFilter<"RideRequest"> | string;
    destinationZone?: Prisma.StringFilter<"RideRequest"> | string;
    seatsRequested?: Prisma.IntFilter<"RideRequest"> | number;
    status?: Prisma.EnumRideStatusFilter<"RideRequest"> | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFilter<"RideRequest"> | Date | string;
    passenger?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    member?: Prisma.XOR<Prisma.PoolMemberNullableScalarRelationFilter, Prisma.PoolMemberWhereInput> | null;
    history?: Prisma.RideStatusHistoryListRelationFilter;
}, "id">;
export type RideRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    passengerId?: Prisma.SortOrder;
    pickupZone?: Prisma.SortOrder;
    destinationZone?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RideRequestCountOrderByAggregateInput;
    _avg?: Prisma.RideRequestAvgOrderByAggregateInput;
    _max?: Prisma.RideRequestMaxOrderByAggregateInput;
    _min?: Prisma.RideRequestMinOrderByAggregateInput;
    _sum?: Prisma.RideRequestSumOrderByAggregateInput;
};
export type RideRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.RideRequestScalarWhereWithAggregatesInput | Prisma.RideRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.RideRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RideRequestScalarWhereWithAggregatesInput | Prisma.RideRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RideRequest"> | string;
    passengerId?: Prisma.StringWithAggregatesFilter<"RideRequest"> | string;
    pickupZone?: Prisma.StringWithAggregatesFilter<"RideRequest"> | string;
    destinationZone?: Prisma.StringWithAggregatesFilter<"RideRequest"> | string;
    seatsRequested?: Prisma.IntWithAggregatesFilter<"RideRequest"> | number;
    status?: Prisma.EnumRideStatusWithAggregatesFilter<"RideRequest"> | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RideRequest"> | Date | string;
};
export type RideRequestCreateInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    passenger: Prisma.UserCreateNestedOneWithoutRidesInput;
    member?: Prisma.PoolMemberCreateNestedOneWithoutRideRequestInput;
    history?: Prisma.RideStatusHistoryCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestUncheckedCreateInput = {
    id?: string;
    passengerId: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    member?: Prisma.PoolMemberUncheckedCreateNestedOneWithoutRideRequestInput;
    history?: Prisma.RideStatusHistoryUncheckedCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    passenger?: Prisma.UserUpdateOneRequiredWithoutRidesNestedInput;
    member?: Prisma.PoolMemberUpdateOneWithoutRideRequestNestedInput;
    history?: Prisma.RideStatusHistoryUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    passengerId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    member?: Prisma.PoolMemberUncheckedUpdateOneWithoutRideRequestNestedInput;
    history?: Prisma.RideStatusHistoryUncheckedUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestCreateManyInput = {
    id?: string;
    passengerId: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
};
export type RideRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RideRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    passengerId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RideRequestListRelationFilter = {
    every?: Prisma.RideRequestWhereInput;
    some?: Prisma.RideRequestWhereInput;
    none?: Prisma.RideRequestWhereInput;
};
export type RideRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RideRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    passengerId?: Prisma.SortOrder;
    pickupZone?: Prisma.SortOrder;
    destinationZone?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RideRequestAvgOrderByAggregateInput = {
    seatsRequested?: Prisma.SortOrder;
};
export type RideRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    passengerId?: Prisma.SortOrder;
    pickupZone?: Prisma.SortOrder;
    destinationZone?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RideRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    passengerId?: Prisma.SortOrder;
    pickupZone?: Prisma.SortOrder;
    destinationZone?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RideRequestSumOrderByAggregateInput = {
    seatsRequested?: Prisma.SortOrder;
};
export type RideRequestScalarRelationFilter = {
    is?: Prisma.RideRequestWhereInput;
    isNot?: Prisma.RideRequestWhereInput;
};
export type RideRequestCreateNestedManyWithoutPassengerInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput> | Prisma.RideRequestCreateWithoutPassengerInput[] | Prisma.RideRequestUncheckedCreateWithoutPassengerInput[];
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutPassengerInput | Prisma.RideRequestCreateOrConnectWithoutPassengerInput[];
    createMany?: Prisma.RideRequestCreateManyPassengerInputEnvelope;
    connect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
};
export type RideRequestUncheckedCreateNestedManyWithoutPassengerInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput> | Prisma.RideRequestCreateWithoutPassengerInput[] | Prisma.RideRequestUncheckedCreateWithoutPassengerInput[];
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutPassengerInput | Prisma.RideRequestCreateOrConnectWithoutPassengerInput[];
    createMany?: Prisma.RideRequestCreateManyPassengerInputEnvelope;
    connect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
};
export type RideRequestUpdateManyWithoutPassengerNestedInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput> | Prisma.RideRequestCreateWithoutPassengerInput[] | Prisma.RideRequestUncheckedCreateWithoutPassengerInput[];
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutPassengerInput | Prisma.RideRequestCreateOrConnectWithoutPassengerInput[];
    upsert?: Prisma.RideRequestUpsertWithWhereUniqueWithoutPassengerInput | Prisma.RideRequestUpsertWithWhereUniqueWithoutPassengerInput[];
    createMany?: Prisma.RideRequestCreateManyPassengerInputEnvelope;
    set?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    disconnect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    delete?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    connect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    update?: Prisma.RideRequestUpdateWithWhereUniqueWithoutPassengerInput | Prisma.RideRequestUpdateWithWhereUniqueWithoutPassengerInput[];
    updateMany?: Prisma.RideRequestUpdateManyWithWhereWithoutPassengerInput | Prisma.RideRequestUpdateManyWithWhereWithoutPassengerInput[];
    deleteMany?: Prisma.RideRequestScalarWhereInput | Prisma.RideRequestScalarWhereInput[];
};
export type RideRequestUncheckedUpdateManyWithoutPassengerNestedInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput> | Prisma.RideRequestCreateWithoutPassengerInput[] | Prisma.RideRequestUncheckedCreateWithoutPassengerInput[];
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutPassengerInput | Prisma.RideRequestCreateOrConnectWithoutPassengerInput[];
    upsert?: Prisma.RideRequestUpsertWithWhereUniqueWithoutPassengerInput | Prisma.RideRequestUpsertWithWhereUniqueWithoutPassengerInput[];
    createMany?: Prisma.RideRequestCreateManyPassengerInputEnvelope;
    set?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    disconnect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    delete?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    connect?: Prisma.RideRequestWhereUniqueInput | Prisma.RideRequestWhereUniqueInput[];
    update?: Prisma.RideRequestUpdateWithWhereUniqueWithoutPassengerInput | Prisma.RideRequestUpdateWithWhereUniqueWithoutPassengerInput[];
    updateMany?: Prisma.RideRequestUpdateManyWithWhereWithoutPassengerInput | Prisma.RideRequestUpdateManyWithWhereWithoutPassengerInput[];
    deleteMany?: Prisma.RideRequestScalarWhereInput | Prisma.RideRequestScalarWhereInput[];
};
export type EnumRideStatusFieldUpdateOperationsInput = {
    set?: $Enums.RideStatus;
};
export type RideRequestCreateNestedOneWithoutMemberInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutMemberInput, Prisma.RideRequestUncheckedCreateWithoutMemberInput>;
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutMemberInput;
    connect?: Prisma.RideRequestWhereUniqueInput;
};
export type RideRequestUpdateOneRequiredWithoutMemberNestedInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutMemberInput, Prisma.RideRequestUncheckedCreateWithoutMemberInput>;
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutMemberInput;
    upsert?: Prisma.RideRequestUpsertWithoutMemberInput;
    connect?: Prisma.RideRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RideRequestUpdateToOneWithWhereWithoutMemberInput, Prisma.RideRequestUpdateWithoutMemberInput>, Prisma.RideRequestUncheckedUpdateWithoutMemberInput>;
};
export type RideRequestCreateNestedOneWithoutHistoryInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutHistoryInput, Prisma.RideRequestUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutHistoryInput;
    connect?: Prisma.RideRequestWhereUniqueInput;
};
export type RideRequestUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.RideRequestCreateWithoutHistoryInput, Prisma.RideRequestUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.RideRequestCreateOrConnectWithoutHistoryInput;
    upsert?: Prisma.RideRequestUpsertWithoutHistoryInput;
    connect?: Prisma.RideRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RideRequestUpdateToOneWithWhereWithoutHistoryInput, Prisma.RideRequestUpdateWithoutHistoryInput>, Prisma.RideRequestUncheckedUpdateWithoutHistoryInput>;
};
export type RideRequestCreateWithoutPassengerInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    member?: Prisma.PoolMemberCreateNestedOneWithoutRideRequestInput;
    history?: Prisma.RideStatusHistoryCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestUncheckedCreateWithoutPassengerInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    member?: Prisma.PoolMemberUncheckedCreateNestedOneWithoutRideRequestInput;
    history?: Prisma.RideStatusHistoryUncheckedCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestCreateOrConnectWithoutPassengerInput = {
    where: Prisma.RideRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput>;
};
export type RideRequestCreateManyPassengerInputEnvelope = {
    data: Prisma.RideRequestCreateManyPassengerInput | Prisma.RideRequestCreateManyPassengerInput[];
    skipDuplicates?: boolean;
};
export type RideRequestUpsertWithWhereUniqueWithoutPassengerInput = {
    where: Prisma.RideRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.RideRequestUpdateWithoutPassengerInput, Prisma.RideRequestUncheckedUpdateWithoutPassengerInput>;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutPassengerInput, Prisma.RideRequestUncheckedCreateWithoutPassengerInput>;
};
export type RideRequestUpdateWithWhereUniqueWithoutPassengerInput = {
    where: Prisma.RideRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.RideRequestUpdateWithoutPassengerInput, Prisma.RideRequestUncheckedUpdateWithoutPassengerInput>;
};
export type RideRequestUpdateManyWithWhereWithoutPassengerInput = {
    where: Prisma.RideRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.RideRequestUpdateManyMutationInput, Prisma.RideRequestUncheckedUpdateManyWithoutPassengerInput>;
};
export type RideRequestScalarWhereInput = {
    AND?: Prisma.RideRequestScalarWhereInput | Prisma.RideRequestScalarWhereInput[];
    OR?: Prisma.RideRequestScalarWhereInput[];
    NOT?: Prisma.RideRequestScalarWhereInput | Prisma.RideRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"RideRequest"> | string;
    passengerId?: Prisma.StringFilter<"RideRequest"> | string;
    pickupZone?: Prisma.StringFilter<"RideRequest"> | string;
    destinationZone?: Prisma.StringFilter<"RideRequest"> | string;
    seatsRequested?: Prisma.IntFilter<"RideRequest"> | number;
    status?: Prisma.EnumRideStatusFilter<"RideRequest"> | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFilter<"RideRequest"> | Date | string;
};
export type RideRequestCreateWithoutMemberInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    passenger: Prisma.UserCreateNestedOneWithoutRidesInput;
    history?: Prisma.RideStatusHistoryCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestUncheckedCreateWithoutMemberInput = {
    id?: string;
    passengerId: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    history?: Prisma.RideStatusHistoryUncheckedCreateNestedManyWithoutRideRequestInput;
};
export type RideRequestCreateOrConnectWithoutMemberInput = {
    where: Prisma.RideRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutMemberInput, Prisma.RideRequestUncheckedCreateWithoutMemberInput>;
};
export type RideRequestUpsertWithoutMemberInput = {
    update: Prisma.XOR<Prisma.RideRequestUpdateWithoutMemberInput, Prisma.RideRequestUncheckedUpdateWithoutMemberInput>;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutMemberInput, Prisma.RideRequestUncheckedCreateWithoutMemberInput>;
    where?: Prisma.RideRequestWhereInput;
};
export type RideRequestUpdateToOneWithWhereWithoutMemberInput = {
    where?: Prisma.RideRequestWhereInput;
    data: Prisma.XOR<Prisma.RideRequestUpdateWithoutMemberInput, Prisma.RideRequestUncheckedUpdateWithoutMemberInput>;
};
export type RideRequestUpdateWithoutMemberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    passenger?: Prisma.UserUpdateOneRequiredWithoutRidesNestedInput;
    history?: Prisma.RideStatusHistoryUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestUncheckedUpdateWithoutMemberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    passengerId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    history?: Prisma.RideStatusHistoryUncheckedUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestCreateWithoutHistoryInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    passenger: Prisma.UserCreateNestedOneWithoutRidesInput;
    member?: Prisma.PoolMemberCreateNestedOneWithoutRideRequestInput;
};
export type RideRequestUncheckedCreateWithoutHistoryInput = {
    id?: string;
    passengerId: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    member?: Prisma.PoolMemberUncheckedCreateNestedOneWithoutRideRequestInput;
};
export type RideRequestCreateOrConnectWithoutHistoryInput = {
    where: Prisma.RideRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutHistoryInput, Prisma.RideRequestUncheckedCreateWithoutHistoryInput>;
};
export type RideRequestUpsertWithoutHistoryInput = {
    update: Prisma.XOR<Prisma.RideRequestUpdateWithoutHistoryInput, Prisma.RideRequestUncheckedUpdateWithoutHistoryInput>;
    create: Prisma.XOR<Prisma.RideRequestCreateWithoutHistoryInput, Prisma.RideRequestUncheckedCreateWithoutHistoryInput>;
    where?: Prisma.RideRequestWhereInput;
};
export type RideRequestUpdateToOneWithWhereWithoutHistoryInput = {
    where?: Prisma.RideRequestWhereInput;
    data: Prisma.XOR<Prisma.RideRequestUpdateWithoutHistoryInput, Prisma.RideRequestUncheckedUpdateWithoutHistoryInput>;
};
export type RideRequestUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    passenger?: Prisma.UserUpdateOneRequiredWithoutRidesNestedInput;
    member?: Prisma.PoolMemberUpdateOneWithoutRideRequestNestedInput;
};
export type RideRequestUncheckedUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    passengerId?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    member?: Prisma.PoolMemberUncheckedUpdateOneWithoutRideRequestNestedInput;
};
export type RideRequestCreateManyPassengerInput = {
    id?: string;
    pickupZone: string;
    destinationZone: string;
    seatsRequested: number;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
};
export type RideRequestUpdateWithoutPassengerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    member?: Prisma.PoolMemberUpdateOneWithoutRideRequestNestedInput;
    history?: Prisma.RideStatusHistoryUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestUncheckedUpdateWithoutPassengerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    member?: Prisma.PoolMemberUncheckedUpdateOneWithoutRideRequestNestedInput;
    history?: Prisma.RideStatusHistoryUncheckedUpdateManyWithoutRideRequestNestedInput;
};
export type RideRequestUncheckedUpdateManyWithoutPassengerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pickupZone?: Prisma.StringFieldUpdateOperationsInput | string;
    destinationZone?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type RideRequestCountOutputType
 */
export type RideRequestCountOutputType = {
    history: number;
};
export type RideRequestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    history?: boolean | RideRequestCountOutputTypeCountHistoryArgs;
};
/**
 * RideRequestCountOutputType without action
 */
export type RideRequestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequestCountOutputType
     */
    select?: Prisma.RideRequestCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * RideRequestCountOutputType without action
 */
export type RideRequestCountOutputTypeCountHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RideStatusHistoryWhereInput;
};
export type RideRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    passengerId?: boolean;
    pickupZone?: boolean;
    destinationZone?: boolean;
    seatsRequested?: boolean;
    status?: boolean;
    createdAt?: boolean;
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.RideRequest$memberArgs<ExtArgs>;
    history?: boolean | Prisma.RideRequest$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.RideRequestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rideRequest"]>;
export type RideRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    passengerId?: boolean;
    pickupZone?: boolean;
    destinationZone?: boolean;
    seatsRequested?: boolean;
    status?: boolean;
    createdAt?: boolean;
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rideRequest"]>;
export type RideRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    passengerId?: boolean;
    pickupZone?: boolean;
    destinationZone?: boolean;
    seatsRequested?: boolean;
    status?: boolean;
    createdAt?: boolean;
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rideRequest"]>;
export type RideRequestSelectScalar = {
    id?: boolean;
    passengerId?: boolean;
    pickupZone?: boolean;
    destinationZone?: boolean;
    seatsRequested?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type RideRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "passengerId" | "pickupZone" | "destinationZone" | "seatsRequested" | "status" | "createdAt", ExtArgs["result"]["rideRequest"]>;
export type RideRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    member?: boolean | Prisma.RideRequest$memberArgs<ExtArgs>;
    history?: boolean | Prisma.RideRequest$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.RideRequestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RideRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RideRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    passenger?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RideRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RideRequest";
    objects: {
        passenger: Prisma.$UserPayload<ExtArgs>;
        member: Prisma.$PoolMemberPayload<ExtArgs> | null;
        history: Prisma.$RideStatusHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        passengerId: string;
        pickupZone: string;
        destinationZone: string;
        seatsRequested: number;
        status: $Enums.RideStatus;
        createdAt: Date;
    }, ExtArgs["result"]["rideRequest"]>;
    composites: {};
};
export type RideRequestGetPayload<S extends boolean | null | undefined | RideRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RideRequestPayload, S>;
export type RideRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RideRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RideRequestCountAggregateInputType | true;
};
export interface RideRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RideRequest'];
        meta: {
            name: 'RideRequest';
        };
    };
    /**
     * Find zero or one RideRequest that matches the filter.
     * @param {RideRequestFindUniqueArgs} args - Arguments to find a RideRequest
     * @example
     * // Get one RideRequest
     * const rideRequest = await prisma.rideRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, RideRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RideRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideRequestFindUniqueOrThrowArgs} args - Arguments to find a RideRequest
     * @example
     * // Get one RideRequest
     * const rideRequest = await prisma.rideRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RideRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RideRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestFindFirstArgs} args - Arguments to find a RideRequest
     * @example
     * // Get one RideRequest
     * const rideRequest = await prisma.rideRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, RideRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RideRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestFindFirstOrThrowArgs} args - Arguments to find a RideRequest
     * @example
     * // Get one RideRequest
     * const rideRequest = await prisma.rideRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RideRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RideRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RideRequests
     * const rideRequests = await prisma.rideRequest.findMany()
     *
     * // Get first 10 RideRequests
     * const rideRequests = await prisma.rideRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rideRequestWithIdOnly = await prisma.rideRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RideRequestFindManyArgs>(args?: Prisma.SelectSubset<T, RideRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RideRequest.
     * @param {RideRequestCreateArgs} args - Arguments to create a RideRequest.
     * @example
     * // Create one RideRequest
     * const RideRequest = await prisma.rideRequest.create({
     *   data: {
     *     // ... data to create a RideRequest
     *   }
     * })
     *
     */
    create<T extends RideRequestCreateArgs>(args: Prisma.SelectSubset<T, RideRequestCreateArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RideRequests.
     * @param {RideRequestCreateManyArgs} args - Arguments to create many RideRequests.
     * @example
     * // Create many RideRequests
     * const rideRequest = await prisma.rideRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RideRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, RideRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RideRequests and returns the data saved in the database.
     * @param {RideRequestCreateManyAndReturnArgs} args - Arguments to create many RideRequests.
     * @example
     * // Create many RideRequests
     * const rideRequest = await prisma.rideRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RideRequests and only return the `id`
     * const rideRequestWithIdOnly = await prisma.rideRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RideRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RideRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RideRequest.
     * @param {RideRequestDeleteArgs} args - Arguments to delete one RideRequest.
     * @example
     * // Delete one RideRequest
     * const RideRequest = await prisma.rideRequest.delete({
     *   where: {
     *     // ... filter to delete one RideRequest
     *   }
     * })
     *
     */
    delete<T extends RideRequestDeleteArgs>(args: Prisma.SelectSubset<T, RideRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RideRequest.
     * @param {RideRequestUpdateArgs} args - Arguments to update one RideRequest.
     * @example
     * // Update one RideRequest
     * const rideRequest = await prisma.rideRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RideRequestUpdateArgs>(args: Prisma.SelectSubset<T, RideRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RideRequests.
     * @param {RideRequestDeleteManyArgs} args - Arguments to filter RideRequests to delete.
     * @example
     * // Delete a few RideRequests
     * const { count } = await prisma.rideRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RideRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, RideRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RideRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RideRequests
     * const rideRequest = await prisma.rideRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RideRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, RideRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RideRequests and returns the data updated in the database.
     * @param {RideRequestUpdateManyAndReturnArgs} args - Arguments to update many RideRequests.
     * @example
     * // Update many RideRequests
     * const rideRequest = await prisma.rideRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RideRequests and only return the `id`
     * const rideRequestWithIdOnly = await prisma.rideRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RideRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RideRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RideRequest.
     * @param {RideRequestUpsertArgs} args - Arguments to update or create a RideRequest.
     * @example
     * // Update or create a RideRequest
     * const rideRequest = await prisma.rideRequest.upsert({
     *   create: {
     *     // ... data to create a RideRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RideRequest we want to update
     *   }
     * })
     */
    upsert<T extends RideRequestUpsertArgs>(args: Prisma.SelectSubset<T, RideRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RideRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestCountArgs} args - Arguments to filter RideRequests to count.
     * @example
     * // Count the number of RideRequests
     * const count = await prisma.rideRequest.count({
     *   where: {
     *     // ... the filter for the RideRequests we want to count
     *   }
     * })
    **/
    count<T extends RideRequestCountArgs>(args?: Prisma.Subset<T, RideRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RideRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RideRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RideRequestAggregateArgs>(args: Prisma.Subset<T, RideRequestAggregateArgs>): Prisma.PrismaPromise<GetRideRequestAggregateType<T>>;
    /**
     * Group by RideRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends RideRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RideRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: RideRequestGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RideRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRideRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RideRequest model
     */
    readonly fields: RideRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RideRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RideRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    passenger<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    member<T extends Prisma.RideRequest$memberArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RideRequest$memberArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    history<T extends Prisma.RideRequest$historyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RideRequest$historyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RideStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the RideRequest model
 */
export interface RideRequestFieldRefs {
    readonly id: Prisma.FieldRef<"RideRequest", 'String'>;
    readonly passengerId: Prisma.FieldRef<"RideRequest", 'String'>;
    readonly pickupZone: Prisma.FieldRef<"RideRequest", 'String'>;
    readonly destinationZone: Prisma.FieldRef<"RideRequest", 'String'>;
    readonly seatsRequested: Prisma.FieldRef<"RideRequest", 'Int'>;
    readonly status: Prisma.FieldRef<"RideRequest", 'RideStatus'>;
    readonly createdAt: Prisma.FieldRef<"RideRequest", 'DateTime'>;
}
/**
 * RideRequest findUnique
 */
export type RideRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter, which RideRequest to fetch.
     */
    where: Prisma.RideRequestWhereUniqueInput;
};
/**
 * RideRequest findUniqueOrThrow
 */
export type RideRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter, which RideRequest to fetch.
     */
    where: Prisma.RideRequestWhereUniqueInput;
};
/**
 * RideRequest findFirst
 */
export type RideRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter, which RideRequest to fetch.
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideRequests to fetch.
     */
    orderBy?: Prisma.RideRequestOrderByWithRelationInput | Prisma.RideRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RideRequests.
     */
    cursor?: Prisma.RideRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RideRequests.
     */
    distinct?: Prisma.RideRequestScalarFieldEnum | Prisma.RideRequestScalarFieldEnum[];
};
/**
 * RideRequest findFirstOrThrow
 */
export type RideRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter, which RideRequest to fetch.
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideRequests to fetch.
     */
    orderBy?: Prisma.RideRequestOrderByWithRelationInput | Prisma.RideRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RideRequests.
     */
    cursor?: Prisma.RideRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RideRequests.
     */
    distinct?: Prisma.RideRequestScalarFieldEnum | Prisma.RideRequestScalarFieldEnum[];
};
/**
 * RideRequest findMany
 */
export type RideRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter, which RideRequests to fetch.
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideRequests to fetch.
     */
    orderBy?: Prisma.RideRequestOrderByWithRelationInput | Prisma.RideRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RideRequests.
     */
    cursor?: Prisma.RideRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RideRequests.
     */
    distinct?: Prisma.RideRequestScalarFieldEnum | Prisma.RideRequestScalarFieldEnum[];
};
/**
 * RideRequest create
 */
export type RideRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * The data needed to create a RideRequest.
     */
    data: Prisma.XOR<Prisma.RideRequestCreateInput, Prisma.RideRequestUncheckedCreateInput>;
};
/**
 * RideRequest createMany
 */
export type RideRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RideRequests.
     */
    data: Prisma.RideRequestCreateManyInput | Prisma.RideRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RideRequest createManyAndReturn
 */
export type RideRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many RideRequests.
     */
    data: Prisma.RideRequestCreateManyInput | Prisma.RideRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RideRequest update
 */
export type RideRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * The data needed to update a RideRequest.
     */
    data: Prisma.XOR<Prisma.RideRequestUpdateInput, Prisma.RideRequestUncheckedUpdateInput>;
    /**
     * Choose, which RideRequest to update.
     */
    where: Prisma.RideRequestWhereUniqueInput;
};
/**
 * RideRequest updateMany
 */
export type RideRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RideRequests.
     */
    data: Prisma.XOR<Prisma.RideRequestUpdateManyMutationInput, Prisma.RideRequestUncheckedUpdateManyInput>;
    /**
     * Filter which RideRequests to update
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * Limit how many RideRequests to update.
     */
    limit?: number;
};
/**
 * RideRequest updateManyAndReturn
 */
export type RideRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * The data used to update RideRequests.
     */
    data: Prisma.XOR<Prisma.RideRequestUpdateManyMutationInput, Prisma.RideRequestUncheckedUpdateManyInput>;
    /**
     * Filter which RideRequests to update
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * Limit how many RideRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RideRequest upsert
 */
export type RideRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * The filter to search for the RideRequest to update in case it exists.
     */
    where: Prisma.RideRequestWhereUniqueInput;
    /**
     * In case the RideRequest found by the `where` argument doesn't exist, create a new RideRequest with this data.
     */
    create: Prisma.XOR<Prisma.RideRequestCreateInput, Prisma.RideRequestUncheckedCreateInput>;
    /**
     * In case the RideRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RideRequestUpdateInput, Prisma.RideRequestUncheckedUpdateInput>;
};
/**
 * RideRequest delete
 */
export type RideRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
    /**
     * Filter which RideRequest to delete.
     */
    where: Prisma.RideRequestWhereUniqueInput;
};
/**
 * RideRequest deleteMany
 */
export type RideRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RideRequests to delete
     */
    where?: Prisma.RideRequestWhereInput;
    /**
     * Limit how many RideRequests to delete.
     */
    limit?: number;
};
/**
 * RideRequest.member
 */
export type RideRequest$memberArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: Prisma.PoolMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: Prisma.PoolMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PoolMemberInclude<ExtArgs> | null;
    where?: Prisma.PoolMemberWhereInput;
};
/**
 * RideRequest.history
 */
export type RideRequest$historyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideStatusHistory
     */
    select?: Prisma.RideStatusHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideStatusHistory
     */
    omit?: Prisma.RideStatusHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideStatusHistoryInclude<ExtArgs> | null;
    where?: Prisma.RideStatusHistoryWhereInput;
    orderBy?: Prisma.RideStatusHistoryOrderByWithRelationInput | Prisma.RideStatusHistoryOrderByWithRelationInput[];
    cursor?: Prisma.RideStatusHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RideStatusHistoryScalarFieldEnum | Prisma.RideStatusHistoryScalarFieldEnum[];
};
/**
 * RideRequest without action
 */
export type RideRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RideRequest
     */
    select?: Prisma.RideRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideRequest
     */
    omit?: Prisma.RideRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RideRequestInclude<ExtArgs> | null;
};
//# sourceMappingURL=RideRequest.d.ts.map