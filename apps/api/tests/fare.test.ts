import { describe, expect, it } from "vitest";
import { calculateFare } from "../src/fare.service";

describe("calculateFare", () => {
	it.each([
		{ distanceMeters: 4200, isPooled: false, expectedFare: 5100 },
		{ distanceMeters: 4200, isPooled: true, expectedFare: 4335 },
		{ distanceMeters: 3100, isPooled: false, expectedFare: 4550 },
		{ distanceMeters: 3100, isPooled: true, expectedFare: 3868 },
	])(
		"returns $expectedFare paisa for $distanceMeters meters (pooled: $isPooled)",
		({ distanceMeters, isPooled, expectedFare }) => {
			expect(calculateFare({ distanceMeters, isPooled })).toBe(expectedFare);
		},
	);
});