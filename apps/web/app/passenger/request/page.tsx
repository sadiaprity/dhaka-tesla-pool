"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { API_URL } from "@/lib/api";

const DHAKA_ZONES = [
	"Banani",
	"Gulshan 1",
	"Mohakhali",
	"Dhanmondi",
	"Mirpur",
	"Uttara",
	"Farmgate",
	"Bashundhara",
];

type RideResult = {
	rideRequest?: {
		id?: unknown;
		member?: { farePaisa?: unknown } | null;
	};
	message?: unknown;
};

type RideOutcome =
	| { type: "matched"; farePaisa: number }
	| { type: "unavailable"; message: string };

function readUserName(token: string) {
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
		const claims = JSON.parse(new TextDecoder().decode(bytes)) as {
			name?: unknown;
		};
		return typeof claims.name === "string" && claims.name.trim()
			? claims.name.trim()
			: null;
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
	return token ? readUserName(token) ?? "Passenger" : "Passenger";
}

function getServerUserNameSnapshot() {
	return "Passenger";
}

function formatFare(farePaisa: number) {
	return `৳${(farePaisa / 100).toFixed(2)}`;
}

function errorMessageFrom(result: unknown) {
	if (typeof result !== "object" || result === null || !("error" in result)) {
		return "We couldn't submit your ride request. Please try again.";
	}

	if (typeof result.error === "string") {
		return result.error;
	}

	if (Array.isArray(result.error)) {
		const messages = result.error
			.flatMap((issue) =>
				typeof issue === "object" &&
				issue !== null &&
				"message" in issue &&
				typeof issue.message === "string"
					? [issue.message]
					: [],
			)
			.filter(Boolean);
		if (messages.length > 0) {
			return messages.join(" ");
		}
	}

	return "We couldn't submit your ride request. Please check your details.";
}

export default function PassengerRequestPage() {
	const router = useRouter();
	const [pickupZone, setPickupZone] = useState("");
	const [destinationZone, setDestinationZone] = useState("");
	const [seatsRequested, setSeatsRequested] = useState("1");
	const userName = useSyncExternalStore(
		subscribeToStorage,
		getUserNameSnapshot,
		getServerUserNameSnapshot,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [rideOutcome, setRideOutcome] = useState<RideOutcome | null>(null);

	const seatCount = Number(seatsRequested);
	const invalidSeats = !Number.isInteger(seatCount) || seatCount < 1;
	const sameZone = pickupZone !== "" && pickupZone === destinationZone;
	const isSubmitDisabled =
		isSubmitting || !pickupZone || !destinationZone || sameZone || invalidSeats;

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setRideOutcome(null);

		const token = window.localStorage.getItem("token");
		if (!token) {
			router.replace("/login");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch(`${API_URL}/rides`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					pickupZone,
					destinationZone,
					seatsRequested: seatCount,
				}),
			});
			const result: unknown = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(errorMessageFrom(result));
			}

			if (typeof result !== "object" || result === null) {
				throw new Error("The server returned an incomplete ride request.");
			}

			const rideResult = result as RideResult;
			if (
				typeof rideResult.message === "string" &&
				rideResult.message.toLowerCase().includes("no driver")
			) {
				setRideOutcome({ type: "unavailable", message: rideResult.message });
				return;
			}

			const rideId = rideResult.rideRequest?.id;
			const farePaisa = rideResult.rideRequest?.member?.farePaisa;
			if (typeof rideId !== "string" || typeof farePaisa !== "number") {
				throw new Error("The server returned an incomplete ride request.");
			}

			setRideOutcome({ type: "matched", farePaisa });
			window.setTimeout(() => {
				router.push(`/passenger/status/${encodeURIComponent(rideId)}`);
			}, 1200);
		} catch (submitError) {
			setError(
				submitError instanceof Error
					? submitError.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	function handleLogout() {
		window.localStorage.removeItem("token");
		router.replace("/login");
	}

	return (
			<main className="min-h-screen bg-[#f1f4ef] text-[#182b26]">
				<header className="border-b border-[#dce5dd] bg-white">
					<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
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
						<nav className="order-3 w-full sm:order-none sm:w-auto">
							<Link
								className="inline-flex rounded-md border border-[#d8e1db] px-3.5 py-2 text-sm font-semibold text-[#36534a] transition hover:border-[#9cb9aa] hover:bg-[#f4f8f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f]"
								href="/passenger/history"
							>
								Ride History
							</Link>
						</nav>
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
							PASSENGER / NEW TRIP
						</p>
						<h1 className="text-3xl font-semibold text-[#18372f] sm:text-4xl">
							Plan a ride
						</h1>
						<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
							Choose your pickup, destination, and seats.
						</p>
					</div>

					<div className="max-w-3xl space-y-5">
						<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-7">
							<div className="mb-6 flex items-start justify-between gap-4 border-b border-[#e8ede9] pb-5">
								<div>
									<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
										RIDE DETAILS
									</p>
									<h2 className="mt-2 text-xl font-semibold text-[#18372f]">
										Where are you headed?
									</h2>
								</div>
								<span className="rounded-md bg-[#eff5ef] px-2.5 py-1.5 text-xs font-medium text-[#356650]">
									Dhaka
								</span>
							</div>

							<form className="space-y-5" onSubmit={handleSubmit}>
								<div className="grid gap-5 sm:grid-cols-2">
									<div>
										<label
											className="mb-2 block text-sm font-medium text-[#263b34]"
											htmlFor="pickupZone"
										>
											Pickup zone
										</label>
										<select
											className="h-12 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
											id="pickupZone"
											name="pickupZone"
											onChange={(event) => setPickupZone(event.target.value)}
											required
											value={pickupZone}
										>
											<option disabled value="">
												Select a pickup zone
											</option>
											{DHAKA_ZONES.map((zone) => (
												<option key={zone} value={zone}>
													{zone}
												</option>
											))}
										</select>
									</div>

									<div>
										<label
											className="mb-2 block text-sm font-medium text-[#263b34]"
											htmlFor="destinationZone"
										>
											Destination zone
										</label>
										<select
											className="h-12 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
											id="destinationZone"
											name="destinationZone"
											onChange={(event) => setDestinationZone(event.target.value)}
											required
											value={destinationZone}
										>
											<option disabled value="">
												Select a destination zone
											</option>
											{DHAKA_ZONES.map((zone) => (
												<option key={zone} value={zone}>
													{zone}
												</option>
											))}
										</select>
										{sameZone && (
											<p className="mt-2 text-xs text-[#923f2e]">
												Choose two different zones.
											</p>
										)}
									</div>

									<div className="sm:max-w-xs">
										<label
											className="mb-2 block text-sm font-medium text-[#263b34]"
											htmlFor="seatsRequested"
										>
											Seats
										</label>
										<input
											className="h-12 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
											id="seatsRequested"
											max={8}
											min={1}
											name="seatsRequested"
											onChange={(event) => setSeatsRequested(event.target.value)}
											step={1}
											type="number"
											value={seatsRequested}
										/>
									</div>
								</div>

								{error && (
								<p
									aria-live="polite"
									className="rounded-md border border-[#e7c6bb] bg-[#fff8f5] px-3.5 py-3 text-sm leading-5 text-[#923f2e]"
									role="alert"
								>
									{error}
								</p>
							)}

							<button
								className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1d594a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174a3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d594a] disabled:cursor-not-allowed disabled:bg-[#78998d]"
								disabled={isSubmitDisabled}
								type="submit"
							>
								{isSubmitting ? (
									<>
										<span
											aria-hidden="true"
											className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
										/>
										Requesting ride…
									</>
								) : (
									"Request ride"
								)}
							</button>
							</form>
						</section>

						{rideOutcome && (
							<section
								aria-live="polite"
								className={`rounded-lg border p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.4)] sm:p-6 ${rideOutcome.type === "matched" ? "border-[#cfe0d2] bg-[#f4f8f3]" : "border-[#e7dfc8] bg-[#fffaf0]"}`}
								role="status"
							>
								<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
									{rideOutcome.type === "matched" ? "MATCH CONFIRMED" : "RIDE REQUEST SAVED"}
								</p>
								{rideOutcome.type === "matched" ? (
									<div className="mt-3 flex flex-wrap items-end justify-between gap-3">
										<p className="text-sm leading-6 text-[#456458]">
											Your estimated fare
										</p>
										<p className="text-2xl font-semibold text-[#1d594a]">
											{formatFare(rideOutcome.farePaisa)}
										</p>
									</div>
								) : (
									<p className="mt-3 text-sm leading-6 text-[#705c2e]">
										{rideOutcome.message}
									</p>
								)}
							</section>
						)}
					</div>
				</div>
		</main>
	);
}