export const BASE_FARE_PAISA = 3000;
export const DISTANCE_RATE_PAISA_PER_100M = 50;
export const POOL_DISCOUNT_PERCENT = 15;

export function calculateFare({
	distanceMeters,
	isPooled,
}: {
	distanceMeters: number;
	isPooled: boolean;
}): number {
	const distanceCharge =
		Math.ceil(distanceMeters / 100) * DISTANCE_RATE_PAISA_PER_100M;
	const fare = BASE_FARE_PAISA + distanceCharge;

	if (!isPooled) {
		return fare;
	}

	return Math.floor(
		(fare * (100 - POOL_DISCOUNT_PERCENT) + 50) / 100,
	);
}