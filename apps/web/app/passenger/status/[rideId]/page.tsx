"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const API_BASE_URL = (
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
const POLL_INTERVAL_MS = 5000;

const RIDE_STATUSES = [
	"REQUESTED",
	"MATCHED",
	"ACCEPTED",
	"DRIVER_ARRIVED",
	"STARTED",
	"COMPLETED",
	"CANCELLED",
] as const;

type RideStatus = (typeof RIDE_STATUSES)[number];

type RideRecord = {
	id: string;
	passengerId: string;
	pickupZone: string;
	destinationZone: string;
	seatsRequested: number;
	status: RideStatus;
	member: { farePaisa: number; isActive: boolean } | null;
};

type JwtClaims = {
	userId?: unknown;
	role?: unknown;
	name?: unknown;
};

function decodeClaims(token: string): JwtClaims | null {
	const payload = token.split(".")[1];
	if (!payload) {
		return null;
	}

	try {
		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
		const binary = window.atob(
			base64.padEnd(Math.ceil(base64.length / 4) * 4, "="),
		);
		const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
		return JSON.parse(new TextDecoder().decode(bytes)) as JwtClaims;
	} catch {
		return null;
	}
}

function subscribeToStorage(callback: () => void) {
	window.addEventListener("storage", callback);
	return () => window.removeEventListener("storage", callback);
}

function getUserNameSnapshot() {
	const token = window.localStorage.getItem("token");
	const name = token ? decodeClaims(token)?.name : null;
	return typeof name === "string" && name.trim() ? name.trim() : "Passenger";
}

function getServerUserNameSnapshot() {
	return "Passenger";
}

function isRideStatus(value: unknown): value is RideStatus {
	return typeof value === "string" && RIDE_STATUSES.includes(value as RideStatus);
}

function isTerminalStatus(status: RideStatus) {
	return status === "COMPLETED" || status === "CANCELLED";
}

function canCancel(status: RideStatus) {
	return ["REQUESTED", "MATCHED", "ACCEPTED", "DRIVER_ARRIVED"].includes(
		status,
	);
}

function statusLabel(status: RideStatus) {
	return status.replaceAll("_", " ");
}

function statusDescription(status: RideStatus) {
	switch (status) {
		case "REQUESTED":
			return "Your request is waiting for an available driver.";
		case "MATCHED":
			return "A ride has been matched. The driver is preparing to accept.";
		case "ACCEPTED":
			return "The driver accepted your ride.";
		case "DRIVER_ARRIVED":
			return "Your driver has arrived at the pickup point.";
		case "STARTED":
			return "Your trip is underway.";
		case "COMPLETED":
			return "Your trip is complete. Thank you for riding.";
		case "CANCELLED":
			return "This ride request was cancelled.";
	}
}

function formatFare(farePaisa: number) {
	return `৳${(farePaisa / 100).toFixed(2)}`;
}

function responseErrorMessage(result: unknown, fallback: string) {
	if (
		typeof result === "object" &&
		result !== null &&
		"error" in result &&
		typeof result.error === "string"
	) {
		return result.error;
	}
	return fallback;
}

function parseRideRecord(result: unknown): RideRecord | null {
	if (typeof result !== "object" || result === null) {
		return null;
	}

	const record = result as Partial<RideRecord>;
	if (
		typeof record.id !== "string" ||
		typeof record.passengerId !== "string" ||
		typeof record.pickupZone !== "string" ||
		typeof record.destinationZone !== "string" ||
		typeof record.seatsRequested !== "number" ||
		!isRideStatus(record.status)
	) {
		return null;
	}

	const member = record.member;
	return {
		id: record.id,
		passengerId: record.passengerId,
		pickupZone: record.pickupZone,
		destinationZone: record.destinationZone,
		seatsRequested: record.seatsRequested,
		status: record.status,
		member:
			typeof member === "object" &&
			member !== null &&
			typeof member.farePaisa === "number" &&
			typeof member.isActive === "boolean"
				? { farePaisa: member.farePaisa, isActive: member.isActive }
				: null,
	};
}

export default function PassengerRideStatusPage() {
	const router = useRouter();
	const params = useParams<{ rideId: string }>();
	const rideId = params.rideId;
	const userName = useSyncExternalStore(
		subscribeToStorage,
		getUserNameSnapshot,
		getServerUserNameSnapshot,
	);
	const [ride, setRide] = useState<RideRecord | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isCancelling, setIsCancelling] = useState(false);
	const [error, setError] = useState("");
	const [cancelError, setCancelError] = useState("");
	const pollingStopped = useRef(false);

	useEffect(() => {
		let disposed = false;
		let timeoutId: number | undefined;
		let firstRequest = true;
		pollingStopped.current = false;

		async function pollRide() {
			if (disposed || pollingStopped.current) {
				return;
			}
			const token = window.localStorage.getItem("token");
			const claims = token ? decodeClaims(token) : null;
			if (
				!token ||
				typeof claims?.userId !== "string" ||
				claims.role !== "PASSENGER"
			) {
				router.replace("/login");
				if (firstRequest) {
					setIsLoading(false);
				}
				return;
			}

			try {
				const response = await fetch(
					`${API_BASE_URL}/rides/${encodeURIComponent(rideId)}`,
					{ headers: { Authorization: `Bearer ${token}` } },
				);
				const result: unknown = await response.json().catch(() => null);
				if (disposed || pollingStopped.current) {
					return;
				}

				if (!response.ok) {
					const message = responseErrorMessage(
						result,
						"We couldn't load this ride. Please try again.",
					);
					setError(message);
					if (response.status === 401) {
						router.replace("/login");
					}
					if (response.status === 401 || response.status === 403 || response.status === 404) {
						return;
					}
				} else {
					const record = parseRideRecord(result);
					if (!record) {
						setError("The server returned an incomplete ride status.");
					} else if (record.passengerId !== claims.userId) {
						setError("This ride request does not belong to your account.");
						return;
					} else {
						setRide(record);
						setError("");
						if (isTerminalStatus(record.status)) {
							pollingStopped.current = true;
							return;
						}
					}
				}
			} catch {
				setError("Connection problem. We'll retry automatically shortly.");
			} finally {
				if (firstRequest) {
					firstRequest = false;
					if (!disposed) {
						setIsLoading(false);
					}
				}
			}

			if (!disposed && !pollingStopped.current) {
				timeoutId = window.setTimeout(pollRide, POLL_INTERVAL_MS);
			}
		}

		void pollRide();
		return () => {
			disposed = true;
			pollingStopped.current = true;
			if (timeoutId !== undefined) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [rideId, router]);

	async function handleCancel() {
		if (!ride || !canCancel(ride.status)) {
			return;
		}

		setCancelError("");
		const token = window.localStorage.getItem("token");
		const claims = token ? decodeClaims(token) : null;
		if (!token || typeof claims?.userId !== "string") {
			router.replace("/login");
			return;
		}
		if (claims.role !== "PASSENGER" || claims.userId !== ride.passengerId) {
			setCancelError("Only the passenger who requested this ride can cancel it.");
			return;
		}

		setIsCancelling(true);
		try {
			const response = await fetch(
				`${API_BASE_URL}/rides/${encodeURIComponent(ride.id)}/cancel`,
				{
					method: "POST",
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const result: unknown = await response.json().catch(() => null);
			if (!response.ok) {
				throw new Error(
					responseErrorMessage(result, "We couldn't cancel this ride."),
				);
			}

			const cancelledRide = parseRideRecord(result);
			if (!cancelledRide || cancelledRide.passengerId !== claims.userId) {
				throw new Error("The server returned an incomplete cancellation result.");
			}
			if (isTerminalStatus(cancelledRide.status)) {
				pollingStopped.current = true;
			}
			setRide({ ...ride, status: cancelledRide.status });
		} catch (cancelRequestError) {
			setCancelError(
				cancelRequestError instanceof Error
					? cancelRequestError.message
					: "Something went wrong while cancelling the ride.",
			);
		} finally {
			setIsCancelling(false);
		}
	}

	function handleLogout() {
		window.localStorage.removeItem("token");
		router.replace("/login");
	}

	return (
		<main className="min-h-screen bg-[#f1f4ef] text-[#182b26]">
			<header className="border-b border-[#dce5dd] bg-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex min-w-0 items-center gap-3">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#153d34] text-sm font-bold tracking-widest text-[#f4c27a]">
							DP
						</div>
						<div className="leading-tight">
							<p className="text-sm font-semibold tracking-[0.12em] text-[#18372f]">
								DHAKA TESLA POOL
							</p>
							<p className="mt-1 text-xs text-[#77847e]">Passenger dashboard</p>
						</div>
					</div>
					<div className="flex shrink-0 items-center gap-3 sm:gap-5">
						<div className="min-w-0 text-right">
							<p className="hidden text-[10px] font-semibold tracking-[0.14em] text-[#77847e] sm:block">
								SIGNED IN AS
							</p>
							<p className="max-w-[88px] truncate text-xs font-medium text-[#18372f] sm:mt-1 sm:max-w-40 sm:text-sm">
								{userName}
							</p>
						</div>
						<button
							className="rounded-md border border-[#d8e1db] px-3.5 py-2 text-sm font-semibold text-[#36534a] transition hover:border-[#9cb9aa] hover:bg-[#f4f8f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f]"
							onClick={handleLogout}
							type="button"
						>
							Log out
						</button>
					</div>
				</div>
			</header>

			<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<div className="mb-7 sm:mb-9">
					<p className="mb-2 text-xs font-semibold tracking-[0.17em] text-[#b45836]">
						PASSENGER / TRIP STATUS
					</p>
					<h1 className="text-3xl font-semibold text-[#18372f] sm:text-4xl">
						Your ride
					</h1>
					<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
						Live status for this ride request.
					</p>
				</div>

				{isLoading ? (
					<section className="flex max-w-3xl items-center gap-3 rounded-lg border border-[#dce5dd] bg-white p-6 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)]">
						<span
							aria-hidden="true"
							className="size-5 animate-spin rounded-full border-2 border-[#1d594a]/20 border-t-[#1d594a]"
						/>
						<p className="text-sm text-[#53675f]">Loading ride status…</p>
					</section>
				) : error && !ride ? (
					<section
						aria-live="polite"
						className="max-w-3xl rounded-lg border border-[#e7c6bb] bg-white p-6 text-sm leading-6 text-[#923f2e] shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)]"
						role="alert"
					>
						{error}
					</section>
				) : ride ? (
					<div className="grid max-w-4xl gap-5 lg:grid-cols-[1.5fr_0.9fr]">
						<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-7">
							<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e8ede9] pb-5">
								<div>
									<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
										RIDE REQUEST
									</p>
									<p className="mt-2 font-mono text-xs text-[#77847e]">
										{ride.id}
									</p>
								</div>
								<span className="rounded-md bg-[#eff5ef] px-2.5 py-1.5 text-xs font-medium text-[#356650]">
									{ride.seatsRequested} {ride.seatsRequested === 1 ? "seat" : "seats"}
								</span>
							</div>

							<div className="grid gap-6 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
								<div>
									<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
										PICKUP
									</p>
									<p className="mt-1 text-lg font-semibold text-[#18372f]">
										{ride.pickupZone}
									</p>
								</div>
								<div aria-hidden="true" className="hidden h-px w-12 bg-[#c8d8cd] sm:block" />
								<div>
									<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
										DESTINATION
									</p>
									<p className="mt-1 text-lg font-semibold text-[#18372f]">
										{ride.destinationZone}
									</p>
								</div>
							</div>

							<div className="rounded-md border border-[#dce5dd] bg-[#f7f9f6] p-4 sm:p-5">
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div>
										<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
											CURRENT STATUS
										</p>
										<p className="mt-1 text-xl font-semibold text-[#18372f]">
											{statusLabel(ride.status)}
										</p>
									</div>
									<span
										className={`size-3 rounded-full ${ride.status === "COMPLETED" ? "bg-[#47825f]" : ride.status === "CANCELLED" ? "bg-[#b45836]" : "animate-pulse bg-[#cf9b46]"}`}
									/>
								</div>
								<p className="mt-2 text-sm leading-6 text-[#61746b]">
									{statusDescription(ride.status)}
								</p>
							</div>
						</section>

						<aside className="space-y-5">
							<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-6">
								<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
									FARE
								</p>
								{ride.member ? (
									<p className="mt-3 text-3xl font-semibold text-[#1d594a]">
										{formatFare(ride.member.farePaisa)}
									</p>
								) : (
									<p className="mt-3 text-sm leading-6 text-[#77847e]">
										Fare will appear once a driver is matched.
									</p>
								)}
							</section>

							{canCancel(ride.status) && (
								<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.4)] sm:p-6">
									{cancelError && (
										<p
											aria-live="polite"
											className="mb-4 rounded-md border border-[#e7c6bb] bg-[#fff8f5] px-3.5 py-3 text-sm leading-5 text-[#923f2e]"
											role="alert"
										>
											{cancelError}
										</p>
									)}
									<button
										className="h-11 w-full rounded-md border border-[#e1b7a9] px-4 text-sm font-semibold text-[#923f2e] transition hover:bg-[#fff8f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#923f2e] disabled:cursor-not-allowed disabled:opacity-60"
										disabled={isCancelling}
										onClick={handleCancel}
										type="button"
									>
										{isCancelling ? "Cancelling…" : "Cancel ride"}
									</button>
									<p className="mt-3 text-xs leading-5 text-[#77847e]">
										Cancellation is available until the trip starts.
									</p>
								</section>
							)}
						</aside>
					</div>
				) : (
					<section className="max-w-3xl rounded-lg border border-[#dce5dd] bg-white p-6 text-sm leading-6 text-[#61746b] shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)]">
						Waiting for ride details…
					</section>
				)}

				{error && ride && (
					<p
						aria-live="polite"
						className="mt-5 max-w-4xl rounded-md border border-[#e7c6bb] bg-[#fff8f5] px-4 py-3 text-sm leading-5 text-[#923f2e]"
						role="alert"
					>
						{error}
					</p>
				)}
			</div>
		</main>
	);
}