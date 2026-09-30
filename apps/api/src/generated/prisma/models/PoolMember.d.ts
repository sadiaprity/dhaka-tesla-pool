import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.ts";
/**
 * Model PoolMember
 *
 */
export type PoolMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$PoolMemberPayload>;
export type AggregatePoolMember = {
    _count: PoolMemberCountAggregateOutputType | null;
    _avg: PoolMemberAvgAggregateOutputType | null;
    _sum: PoolMemberSumAggregateOutputType | null;
    _min: PoolMemberMinAggregateOutputType | null;
    _max: PoolMemberMaxAggregateOutputType | null;
};
export type PoolMemberAvgAggregateOutputType = {
    seatsRequested: number | null;
    seatNumbers: number | null;
    farePaisa: number | null;
};
export type PoolMemberSumAggregateOutputType = {
    seatsRequested: number | null;
    seatNumbers: number[];
    farePaisa: number | null;
};
export type PoolMemberMinAggregateOutputType = {
    id: string | null;
    poolId: string | null;
    rideRequestId: string | null;
    seatsRequested: number | null;
    farePaisa: number | null;
    isActive: boolean | null;
};
export type PoolMemberMaxAggregateOutputType = {
    id: string | null;
    poolId: string | null;
    rideRequestId: string | null;
    seatsRequested: number | null;
    farePaisa: number | null;
    isActive: boolean | null;
};
export type PoolMemberCountAggregateOutputType = {
    id: number;
    poolId: number;
    rideRequestId: number;
    seatsRequested: number;
    seatNumbers: number;
    farePaisa: number;
    isActive: number;
    _all: number;
};
export type PoolMemberAvgAggregateInputType = {
    seatsRequested?: true;
    seatNumbers?: true;
    farePaisa?: true;
};
export type PoolMemberSumAggregateInputType = {
    seatsRequested?: true;
    seatNumbers?: true;
    farePaisa?: true;
};
export type PoolMemberMinAggregateInputType = {
    id?: true;
    poolId?: true;
    rideRequestId?: true;
    seatsRequested?: true;
    farePaisa?: true;
    isActive?: true;
};
export type PoolMemberMaxAggregateInputType = {
    id?: true;
    poolId?: true;
    rideRequestId?: true;
    seatsRequested?: true;
    farePaisa?: true;
    isActive?: true;
};
export type PoolMemberCountAggregateInputType = {
    id?: true;
    poolId?: true;
    rideRequestId?: true;
    seatsRequested?: true;
    seatNumbers?: true;
    farePaisa?: true;
    isActive?: true;
    _all?: true;
};
export type PoolMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PoolMember to aggregate.
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: Prisma.PoolMemberOrderByWithRelationInput | Prisma.PoolMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PoolMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PoolMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PoolMembers
    **/
    _count?: true | PoolMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PoolMemberAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PoolMemberSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PoolMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PoolMemberMaxAggregateInputType;
};
export type GetPoolMemberAggregateType<T extends PoolMemberAggregateArgs> = {
    [P in keyof T & keyof AggregatePoolMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePoolMember[P]> : Prisma.GetScalarType<T[P], AggregatePoolMember[P]>;
};
export type PoolMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PoolMemberWhereInput;
    orderBy?: Prisma.PoolMemberOrderByWithAggregationInput | Prisma.PoolMemberOrderByWithAggregationInput[];
    by: Prisma.PoolMemberScalarFieldEnum[] | Prisma.PoolMemberScalarFieldEnum;
    having?: Prisma.PoolMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PoolMemberCountAggregateInputType | true;
    _avg?: PoolMemberAvgAggregateInputType;
    _sum?: PoolMemberSumAggregateInputType;
    _min?: PoolMemberMinAggregateInputType;
    _max?: PoolMemberMaxAggregateInputType;
};
export type PoolMemberGroupByOutputType = {
    id: string;
    poolId: string;
    rideRequestId: string;
    seatsRequested: number;
    seatNumbers: number[];
    farePaisa: number;
    isActive: boolean;
    _count: PoolMemberCountAggregateOutputType | null;
    _avg: PoolMemberAvgAggregateOutputType | null;
    _sum: PoolMemberSumAggregateOutputType | null;
    _min: PoolMemberMinAggregateOutputType | null;
    _max: PoolMemberMaxAggregateOutputType | null;
};
export type GetPoolMemberGroupByPayload<T extends PoolMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PoolMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PoolMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PoolMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PoolMemberGroupByOutputType[P]>;
}>>;
export type PoolMemberWhereInput = {
    AND?: Prisma.PoolMemberWhereInput | Prisma.PoolMemberWhereInput[];
    OR?: Prisma.PoolMemberWhereInput[];
    NOT?: Prisma.PoolMemberWhereInput | Prisma.PoolMemberWhereInput[];
    id?: Prisma.StringFilter<"PoolMember"> | string;
    poolId?: Prisma.StringFilter<"PoolMember"> | string;
    rideRequestId?: Prisma.StringFilter<"PoolMember"> | string;
    seatsRequested?: Prisma.IntFilter<"PoolMember"> | number;
    seatNumbers?: Prisma.IntNullableListFilter<"PoolMember">;
    farePaisa?: Prisma.IntFilter<"PoolMember"> | number;
    isActive?: Prisma.BoolFilter<"PoolMember"> | boolean;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    rideRequest?: Prisma.XOR<Prisma.RideRequestScalarRelationFilter, Prisma.RideRequestWhereInput>;
};
export type PoolMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    rideRequestId?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    seatNumbers?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    pool?: Prisma.PoolOrderByWithRelationInput;
    rideRequest?: Prisma.RideRequestOrderByWithRelationInput;
};
export type PoolMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    rideRequestId?: string;
    AND?: Prisma.PoolMemberWhereInput | Prisma.PoolMemberWhereInput[];
    OR?: Prisma.PoolMemberWhereInput[];
    NOT?: Prisma.PoolMemberWhereInput | Prisma.PoolMemberWhereInput[];
    poolId?: Prisma.StringFilter<"PoolMember"> | string;
    seatsRequested?: Prisma.IntFilter<"PoolMember"> | number;
    seatNumbers?: Prisma.IntNullableListFilter<"PoolMember">;
    farePaisa?: Prisma.IntFilter<"PoolMember"> | number;
    isActive?: Prisma.BoolFilter<"PoolMember"> | boolean;
    pool?: Prisma.XOR<Prisma.PoolScalarRelationFilter, Prisma.PoolWhereInput>;
    rideRequest?: Prisma.XOR<Prisma.RideRequestScalarRelationFilter, Prisma.RideRequestWhereInput>;
}, "id" | "rideRequestId">;
export type PoolMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    rideRequestId?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    seatNumbers?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.PoolMemberCountOrderByAggregateInput;
    _avg?: Prisma.PoolMemberAvgOrderByAggregateInput;
    _max?: Prisma.PoolMemberMaxOrderByAggregateInput;
    _min?: Prisma.PoolMemberMinOrderByAggregateInput;
    _sum?: Prisma.PoolMemberSumOrderByAggregateInput;
};
export type PoolMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.PoolMemberScalarWhereWithAggregatesInput | Prisma.PoolMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.PoolMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PoolMemberScalarWhereWithAggregatesInput | Prisma.PoolMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PoolMember"> | string;
    poolId?: Prisma.StringWithAggregatesFilter<"PoolMember"> | string;
    rideRequestId?: Prisma.StringWithAggregatesFilter<"PoolMember"> | string;
    seatsRequested?: Prisma.IntWithAggregatesFilter<"PoolMember"> | number;
    seatNumbers?: Prisma.IntNullableListFilter<"PoolMember">;
    farePaisa?: Prisma.IntWithAggregatesFilter<"PoolMember"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"PoolMember"> | boolean;
};
export type PoolMemberCreateInput = {
    id?: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
    pool: Prisma.PoolCreateNestedOneWithoutMembersInput;
    rideRequest: Prisma.RideRequestCreateNestedOneWithoutMemberInput;
};
export type PoolMemberUncheckedCreateInput = {
    id?: string;
    poolId: string;
    rideRequestId: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
};
export type PoolMemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pool?: Prisma.PoolUpdateOneRequiredWithoutMembersNestedInput;
    rideRequest?: Prisma.RideRequestUpdateOneRequiredWithoutMemberNestedInput;
};
export type PoolMemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    poolId?: Prisma.StringFieldUpdateOperationsInput | string;
    rideRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberCreateManyInput = {
    id?: string;
    poolId: string;
    rideRequestId: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
};
export type PoolMemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    poolId?: Prisma.StringFieldUpdateOperationsInput | string;
    rideRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberListRelationFilter = {
    every?: Prisma.PoolMemberWhereInput;
    some?: Prisma.PoolMemberWhereInput;
    none?: Prisma.PoolMemberWhereInput;
};
export type PoolMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PoolMemberNullableScalarRelationFilter = {
    is?: Prisma.PoolMemberWhereInput | null;
    isNot?: Prisma.PoolMemberWhereInput | null;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type PoolMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    rideRequestId?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    seatNumbers?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type PoolMemberAvgOrderByAggregateInput = {
    seatsRequested?: Prisma.SortOrder;
    seatNumbers?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
};
export type PoolMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    rideRequestId?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type PoolMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    poolId?: Prisma.SortOrder;
    rideRequestId?: Prisma.SortOrder;
    seatsRequested?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type PoolMemberSumOrderByAggregateInput = {
    seatsRequested?: Prisma.SortOrder;
    seatNumbers?: Prisma.SortOrder;
    farePaisa?: Prisma.SortOrder;
};
export type PoolMemberCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput> | Prisma.PoolMemberCreateWithoutPoolInput[] | Prisma.PoolMemberUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutPoolInput | Prisma.PoolMemberCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PoolMemberCreateManyPoolInputEnvelope;
    connect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
};
export type PoolMemberUncheckedCreateNestedManyWithoutPoolInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput> | Prisma.PoolMemberCreateWithoutPoolInput[] | Prisma.PoolMemberUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutPoolInput | Prisma.PoolMemberCreateOrConnectWithoutPoolInput[];
    createMany?: Prisma.PoolMemberCreateManyPoolInputEnvelope;
    connect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
};
export type PoolMemberUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput> | Prisma.PoolMemberCreateWithoutPoolInput[] | Prisma.PoolMemberUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutPoolInput | Prisma.PoolMemberCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PoolMemberUpsertWithWhereUniqueWithoutPoolInput | Prisma.PoolMemberUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PoolMemberCreateManyPoolInputEnvelope;
    set?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    disconnect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    delete?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    connect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    update?: Prisma.PoolMemberUpdateWithWhereUniqueWithoutPoolInput | Prisma.PoolMemberUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PoolMemberUpdateManyWithWhereWithoutPoolInput | Prisma.PoolMemberUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PoolMemberScalarWhereInput | Prisma.PoolMemberScalarWhereInput[];
};
export type PoolMemberUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput> | Prisma.PoolMemberCreateWithoutPoolInput[] | Prisma.PoolMemberUncheckedCreateWithoutPoolInput[];
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutPoolInput | Prisma.PoolMemberCreateOrConnectWithoutPoolInput[];
    upsert?: Prisma.PoolMemberUpsertWithWhereUniqueWithoutPoolInput | Prisma.PoolMemberUpsertWithWhereUniqueWithoutPoolInput[];
    createMany?: Prisma.PoolMemberCreateManyPoolInputEnvelope;
    set?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    disconnect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    delete?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    connect?: Prisma.PoolMemberWhereUniqueInput | Prisma.PoolMemberWhereUniqueInput[];
    update?: Prisma.PoolMemberUpdateWithWhereUniqueWithoutPoolInput | Prisma.PoolMemberUpdateWithWhereUniqueWithoutPoolInput[];
    updateMany?: Prisma.PoolMemberUpdateManyWithWhereWithoutPoolInput | Prisma.PoolMemberUpdateManyWithWhereWithoutPoolInput[];
    deleteMany?: Prisma.PoolMemberScalarWhereInput | Prisma.PoolMemberScalarWhereInput[];
};
export type PoolMemberCreateNestedOneWithoutRideRequestInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutRideRequestInput;
    connect?: Prisma.PoolMemberWhereUniqueInput;
};
export type PoolMemberUncheckedCreateNestedOneWithoutRideRequestInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutRideRequestInput;
    connect?: Prisma.PoolMemberWhereUniqueInput;
};
export type PoolMemberUpdateOneWithoutRideRequestNestedInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutRideRequestInput;
    upsert?: Prisma.PoolMemberUpsertWithoutRideRequestInput;
    disconnect?: Prisma.PoolMemberWhereInput | boolean;
    delete?: Prisma.PoolMemberWhereInput | boolean;
    connect?: Prisma.PoolMemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolMemberUpdateToOneWithWhereWithoutRideRequestInput, Prisma.PoolMemberUpdateWithoutRideRequestInput>, Prisma.PoolMemberUncheckedUpdateWithoutRideRequestInput>;
};
export type PoolMemberUncheckedUpdateOneWithoutRideRequestNestedInput = {
    create?: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
    connectOrCreate?: Prisma.PoolMemberCreateOrConnectWithoutRideRequestInput;
    upsert?: Prisma.PoolMemberUpsertWithoutRideRequestInput;
    disconnect?: Prisma.PoolMemberWhereInput | boolean;
    delete?: Prisma.PoolMemberWhereInput | boolean;
    connect?: Prisma.PoolMemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PoolMemberUpdateToOneWithWhereWithoutRideRequestInput, Prisma.PoolMemberUpdateWithoutRideRequestInput>, Prisma.PoolMemberUncheckedUpdateWithoutRideRequestInput>;
};
export type PoolMemberCreateseatNumbersInput = {
    set: number[];
};
export type PoolMemberUpdateseatNumbersInput = {
    set?: number[];
    push?: number | number[];
};
export type PoolMemberCreateWithoutPoolInput = {
    id?: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
    rideRequest: Prisma.RideRequestCreateNestedOneWithoutMemberInput;
};
export type PoolMemberUncheckedCreateWithoutPoolInput = {
    id?: string;
    rideRequestId: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
};
export type PoolMemberCreateOrConnectWithoutPoolInput = {
    where: Prisma.PoolMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput>;
};
export type PoolMemberCreateManyPoolInputEnvelope = {
    data: Prisma.PoolMemberCreateManyPoolInput | Prisma.PoolMemberCreateManyPoolInput[];
    skipDuplicates?: boolean;
};
export type PoolMemberUpsertWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PoolMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.PoolMemberUpdateWithoutPoolInput, Prisma.PoolMemberUncheckedUpdateWithoutPoolInput>;
    create: Prisma.XOR<Prisma.PoolMemberCreateWithoutPoolInput, Prisma.PoolMemberUncheckedCreateWithoutPoolInput>;
};
export type PoolMemberUpdateWithWhereUniqueWithoutPoolInput = {
    where: Prisma.PoolMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.PoolMemberUpdateWithoutPoolInput, Prisma.PoolMemberUncheckedUpdateWithoutPoolInput>;
};
export type PoolMemberUpdateManyWithWhereWithoutPoolInput = {
    where: Prisma.PoolMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.PoolMemberUpdateManyMutationInput, Prisma.PoolMemberUncheckedUpdateManyWithoutPoolInput>;
};
export type PoolMemberScalarWhereInput = {
    AND?: Prisma.PoolMemberScalarWhereInput | Prisma.PoolMemberScalarWhereInput[];
    OR?: Prisma.PoolMemberScalarWhereInput[];
    NOT?: Prisma.PoolMemberScalarWhereInput | Prisma.PoolMemberScalarWhereInput[];
    id?: Prisma.StringFilter<"PoolMember"> | string;
    poolId?: Prisma.StringFilter<"PoolMember"> | string;
    rideRequestId?: Prisma.StringFilter<"PoolMember"> | string;
    seatsRequested?: Prisma.IntFilter<"PoolMember"> | number;
    seatNumbers?: Prisma.IntNullableListFilter<"PoolMember">;
    farePaisa?: Prisma.IntFilter<"PoolMember"> | number;
    isActive?: Prisma.BoolFilter<"PoolMember"> | boolean;
};
export type PoolMemberCreateWithoutRideRequestInput = {
    id?: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
    pool: Prisma.PoolCreateNestedOneWithoutMembersInput;
};
export type PoolMemberUncheckedCreateWithoutRideRequestInput = {
    id?: string;
    poolId: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
};
export type PoolMemberCreateOrConnectWithoutRideRequestInput = {
    where: Prisma.PoolMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
};
export type PoolMemberUpsertWithoutRideRequestInput = {
    update: Prisma.XOR<Prisma.PoolMemberUpdateWithoutRideRequestInput, Prisma.PoolMemberUncheckedUpdateWithoutRideRequestInput>;
    create: Prisma.XOR<Prisma.PoolMemberCreateWithoutRideRequestInput, Prisma.PoolMemberUncheckedCreateWithoutRideRequestInput>;
    where?: Prisma.PoolMemberWhereInput;
};
export type PoolMemberUpdateToOneWithWhereWithoutRideRequestInput = {
    where?: Prisma.PoolMemberWhereInput;
    data: Prisma.XOR<Prisma.PoolMemberUpdateWithoutRideRequestInput, Prisma.PoolMemberUncheckedUpdateWithoutRideRequestInput>;
};
export type PoolMemberUpdateWithoutRideRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pool?: Prisma.PoolUpdateOneRequiredWithoutMembersNestedInput;
};
export type PoolMemberUncheckedUpdateWithoutRideRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    poolId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberCreateManyPoolInput = {
    id?: string;
    rideRequestId: string;
    seatsRequested: number;
    seatNumbers?: Prisma.PoolMemberCreateseatNumbersInput | number[];
    farePaisa: number;
    isActive?: boolean;
};
export type PoolMemberUpdateWithoutPoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    rideRequest?: Prisma.RideRequestUpdateOneRequiredWithoutMemberNestedInput;
};
export type PoolMemberUncheckedUpdateWithoutPoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rideRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberUncheckedUpdateManyWithoutPoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rideRequestId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatsRequested?: Prisma.IntFieldUpdateOperationsInput | number;
    seatNumbers?: Prisma.PoolMemberUpdateseatNumbersInput | number[];
    farePaisa?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type PoolMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    rideRequestId?: boolean;
    seatsRequested?: boolean;
    seatNumbers?: boolean;
    farePaisa?: boolean;
    isActive?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poolMember"]>;
export type PoolMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    rideRequestId?: boolean;
    seatsRequested?: boolean;
    seatNumbers?: boolean;
    farePaisa?: boolean;
    isActive?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poolMember"]>;
export type PoolMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    poolId?: boolean;
    rideRequestId?: boolean;
    seatsRequested?: boolean;
    seatNumbers?: boolean;
    farePaisa?: boolean;
    isActive?: boolean;
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["poolMember"]>;
export type PoolMemberSelectScalar = {
    id?: boolean;
    poolId?: boolean;
    rideRequestId?: boolean;
    seatsRequested?: boolean;
    seatNumbers?: boolean;
    farePaisa?: boolean;
    isActive?: boolean;
};
export type PoolMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "poolId" | "rideRequestId" | "seatsRequested" | "seatNumbers" | "farePaisa" | "isActive", ExtArgs["result"]["poolMember"]>;
export type PoolMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
};
export type PoolMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
};
export type PoolMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pool?: boolean | Prisma.PoolDefaultArgs<ExtArgs>;
    rideRequest?: boolean | Prisma.RideRequestDefaultArgs<ExtArgs>;
};
export type $PoolMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PoolMember";
    objects: {
        pool: Prisma.$PoolPayload<ExtArgs>;
        rideRequest: Prisma.$RideRequestPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        poolId: string;
        rideRequestId: string;
        seatsRequested: number;
        seatNumbers: number[];
        farePaisa: number;
        isActive: boolean;
    }, ExtArgs["result"]["poolMember"]>;
    composites: {};
};
export type PoolMemberGetPayload<S extends boolean | null | undefined | PoolMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload, S>;
export type PoolMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PoolMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PoolMemberCountAggregateInputType | true;
};
export interface PoolMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PoolMember'];
        meta: {
            name: 'PoolMember';
        };
    };
    /**
     * Find zero or one PoolMember that matches the filter.
     * @param {PoolMemberFindUniqueArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoolMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, PoolMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PoolMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoolMemberFindUniqueOrThrowArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoolMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PoolMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PoolMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindFirstArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoolMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, PoolMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PoolMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindFirstOrThrowArgs} args - Arguments to find a PoolMember
     * @example
     * // Get one PoolMember
     * const poolMember = await prisma.poolMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoolMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PoolMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PoolMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PoolMembers
     * const poolMembers = await prisma.poolMember.findMany()
     *
     * // Get first 10 PoolMembers
     * const poolMembers = await prisma.poolMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const poolMemberWithIdOnly = await prisma.poolMember.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PoolMemberFindManyArgs>(args?: Prisma.SelectSubset<T, PoolMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PoolMember.
     * @param {PoolMemberCreateArgs} args - Arguments to create a PoolMember.
     * @example
     * // Create one PoolMember
     * const PoolMember = await prisma.poolMember.create({
     *   data: {
     *     // ... data to create a PoolMember
     *   }
     * })
     *
     */
    create<T extends PoolMemberCreateArgs>(args: Prisma.SelectSubset<T, PoolMemberCreateArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PoolMembers.
     * @param {PoolMemberCreateManyArgs} args - Arguments to create many PoolMembers.
     * @example
     * // Create many PoolMembers
     * const poolMember = await prisma.poolMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PoolMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, PoolMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PoolMembers and returns the data saved in the database.
     * @param {PoolMemberCreateManyAndReturnArgs} args - Arguments to create many PoolMembers.
     * @example
     * // Create many PoolMembers
     * const poolMember = await prisma.poolMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PoolMembers and only return the `id`
     * const poolMemberWithIdOnly = await prisma.poolMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PoolMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PoolMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PoolMember.
     * @param {PoolMemberDeleteArgs} args - Arguments to delete one PoolMember.
     * @example
     * // Delete one PoolMember
     * const PoolMember = await prisma.poolMember.delete({
     *   where: {
     *     // ... filter to delete one PoolMember
     *   }
     * })
     *
     */
    delete<T extends PoolMemberDeleteArgs>(args: Prisma.SelectSubset<T, PoolMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PoolMember.
     * @param {PoolMemberUpdateArgs} args - Arguments to update one PoolMember.
     * @example
     * // Update one PoolMember
     * const poolMember = await prisma.poolMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PoolMemberUpdateArgs>(args: Prisma.SelectSubset<T, PoolMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PoolMembers.
     * @param {PoolMemberDeleteManyArgs} args - Arguments to filter PoolMembers to delete.
     * @example
     * // Delete a few PoolMembers
     * const { count } = await prisma.poolMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PoolMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, PoolMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PoolMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PoolMembers
     * const poolMember = await prisma.poolMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PoolMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, PoolMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PoolMembers and returns the data updated in the database.
     * @param {PoolMemberUpdateManyAndReturnArgs} args - Arguments to update many PoolMembers.
     * @example
     * // Update many PoolMembers
     * const poolMember = await prisma.poolMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PoolMembers and only return the `id`
     * const poolMemberWithIdOnly = await prisma.poolMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends PoolMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PoolMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PoolMember.
     * @param {PoolMemberUpsertArgs} args - Arguments to update or create a PoolMember.
     * @example
     * // Update or create a PoolMember
     * const poolMember = await prisma.poolMember.upsert({
     *   create: {
     *     // ... data to create a PoolMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PoolMember we want to update
     *   }
     * })
     */
    upsert<T extends PoolMemberUpsertArgs>(args: Prisma.SelectSubset<T, PoolMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__PoolMemberClient<runtime.Types.Result.GetResult<Prisma.$PoolMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PoolMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberCountArgs} args - Arguments to filter PoolMembers to count.
     * @example
     * // Count the number of PoolMembers
     * const count = await prisma.poolMember.count({
     *   where: {
     *     // ... the filter for the PoolMembers we want to count
     *   }
     * })
    **/
    count<T extends PoolMemberCountArgs>(args?: Prisma.Subset<T, PoolMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PoolMemberCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PoolMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PoolMemberAggregateArgs>(args: Prisma.Subset<T, PoolMemberAggregateArgs>): Prisma.PrismaPromise<GetPoolMemberAggregateType<T>>;
    /**
     * Group by PoolMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolMemberGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PoolMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PoolMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: PoolMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PoolMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PoolMember model
     */
    readonly fields: PoolMemberFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PoolMember.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PoolMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pool<T extends Prisma.PoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PoolDefaultArgs<ExtArgs>>): Prisma.Prisma__PoolClient<runtime.Types.Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rideRequest<T extends Prisma.RideRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RideRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__RideRequestClient<runtime.Types.Result.GetResult<Prisma.$RideRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PoolMember model
 */
export interface PoolMemberFieldRefs {
    readonly id: Prisma.FieldRef<"PoolMember", 'String'>;
    readonly poolId: Prisma.FieldRef<"PoolMember", 'String'>;
    readonly rideRequestId: Prisma.FieldRef<"PoolMember", 'String'>;
    readonly seatsRequested: Prisma.FieldRef<"PoolMember", 'Int'>;
    readonly seatNumbers: Prisma.FieldRef<"PoolMember", 'Int[]'>;
    readonly farePaisa: Prisma.FieldRef<"PoolMember", 'Int'>;
    readonly isActive: Prisma.FieldRef<"PoolMember", 'Boolean'>;
}
/**
 * PoolMember findUnique
 */
export type PoolMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PoolMember to fetch.
     */
    where: Prisma.PoolMemberWhereUniqueInput;
};
/**
 * PoolMember findUniqueOrThrow
 */
export type PoolMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PoolMember to fetch.
     */
    where: Prisma.PoolMemberWhereUniqueInput;
};
/**
 * PoolMember findFirst
 */
export type PoolMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PoolMember to fetch.
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: Prisma.PoolMemberOrderByWithRelationInput | Prisma.PoolMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PoolMembers.
     */
    cursor?: Prisma.PoolMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PoolMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PoolMembers.
     */
    distinct?: Prisma.PoolMemberScalarFieldEnum | Prisma.PoolMemberScalarFieldEnum[];
};
/**
 * PoolMember findFirstOrThrow
 */
export type PoolMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PoolMember to fetch.
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: Prisma.PoolMemberOrderByWithRelationInput | Prisma.PoolMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PoolMembers.
     */
    cursor?: Prisma.PoolMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PoolMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PoolMembers.
     */
    distinct?: Prisma.PoolMemberScalarFieldEnum | Prisma.PoolMemberScalarFieldEnum[];
};
/**
 * PoolMember findMany
 */
export type PoolMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PoolMembers to fetch.
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PoolMembers to fetch.
     */
    orderBy?: Prisma.PoolMemberOrderByWithRelationInput | Prisma.PoolMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PoolMembers.
     */
    cursor?: Prisma.PoolMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PoolMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PoolMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PoolMembers.
     */
    distinct?: Prisma.PoolMemberScalarFieldEnum | Prisma.PoolMemberScalarFieldEnum[];
};
/**
 * PoolMember create
 */
export type PoolMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PoolMember.
     */
    data: Prisma.XOR<Prisma.PoolMemberCreateInput, Prisma.PoolMemberUncheckedCreateInput>;
};
/**
 * PoolMember createMany
 */
export type PoolMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PoolMembers.
     */
    data: Prisma.PoolMemberCreateManyInput | Prisma.PoolMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PoolMember createManyAndReturn
 */
export type PoolMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: Prisma.PoolMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: Prisma.PoolMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many PoolMembers.
     */
    data: Prisma.PoolMemberCreateManyInput | Prisma.PoolMemberCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PoolMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PoolMember update
 */
export type PoolMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PoolMember.
     */
    data: Prisma.XOR<Prisma.PoolMemberUpdateInput, Prisma.PoolMemberUncheckedUpdateInput>;
    /**
     * Choose, which PoolMember to update.
     */
    where: Prisma.PoolMemberWhereUniqueInput;
};
/**
 * PoolMember updateMany
 */
export type PoolMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PoolMembers.
     */
    data: Prisma.XOR<Prisma.PoolMemberUpdateManyMutationInput, Prisma.PoolMemberUncheckedUpdateManyInput>;
    /**
     * Filter which PoolMembers to update
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * Limit how many PoolMembers to update.
     */
    limit?: number;
};
/**
 * PoolMember updateManyAndReturn
 */
export type PoolMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolMember
     */
    select?: Prisma.PoolMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PoolMember
     */
    omit?: Prisma.PoolMemberOmit<ExtArgs> | null;
    /**
     * The data used to update PoolMembers.
     */
    data: Prisma.XOR<Prisma.PoolMemberUpdateManyMutationInput, Prisma.PoolMemberUncheckedUpdateManyInput>;
    /**
     * Filter which PoolMembers to update
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * Limit how many PoolMembers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PoolMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PoolMember upsert
 */
export type PoolMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PoolMember to update in case it exists.
     */
    where: Prisma.PoolMemberWhereUniqueInput;
    /**
     * In case the PoolMember found by the `where` argument doesn't exist, create a new PoolMember with this data.
     */
    create: Prisma.XOR<Prisma.PoolMemberCreateInput, Prisma.PoolMemberUncheckedCreateInput>;
    /**
     * In case the PoolMember was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PoolMemberUpdateInput, Prisma.PoolMemberUncheckedUpdateInput>;
};
/**
 * PoolMember delete
 */
export type PoolMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PoolMember to delete.
     */
    where: Prisma.PoolMemberWhereUniqueInput;
};
/**
 * PoolMember deleteMany
 */
export type PoolMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PoolMembers to delete
     */
    where?: Prisma.PoolMemberWhereInput;
    /**
     * Limit how many PoolMembers to delete.
     */
    limit?: number;
};
/**
 * PoolMember without action
 */
export type PoolMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=PoolMember.d.ts.map