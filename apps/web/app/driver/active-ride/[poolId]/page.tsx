"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { API_URL } from "@/lib/api";

type JwtClaims = {
	userId?: unknown;
	role?: unknown;
	name?: unknown;
};

type PoolMember = {
	seatsRequested: number;
	seatNumbers: number[];
	farePaisa: number;
	isActive: boolean;
	rideRequest: {
		id: string;
		status: string;
		passenger: { name: string };
	};
};

type DriverPool = {
	id: string;
	pickupZone: string;
	destinationZone: string;
	status: "OPEN" | "CLOSED";
	vehicle: { id: string; capacity: number; isOnline: boolean };
	members: PoolMember[];
};

type Vehicle = {
	id: string;
	capacity: number;
};

function decodeClaims(token: string): JwtClaims | null {
	const payload = token.split(".")[1];
	if (!payload) return null;
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
	return typeof name === "string" && name.trim() ? name.trim() : "Driver";
}

function getServerUserNameSnapshot() {
	return "Driver";
}

async function readResponse(response: Response) {
	const data: unknown = await response.json().catch(() => null);
	if (!response.ok) {
		const message =
			typeof data === "object" &&
				data !== null &&
				"error" in data &&
				typeof data.error === "string"
				? data.error
				: "The request couldn't be completed. Please try again.";
		throw new Error(message);
	}
	return data;
}

function parseVehicle(value: unknown): Vehicle | null {
	if (typeof value !== "object" || value === null) return null;
	const vehicle = value as Partial<Vehicle>;
	return typeof vehicle.id === "string" && typeof vehicle.capacity === "number"
		? { id: vehicle.id, capacity: vehicle.capacity }
		: null;
}

function parsePoolList(value: unknown): DriverPool[] | null {
	if (!Array.isArray(value)) return null;
	return value as DriverPool[];
}

function formatFare(farePaisa: number) {
	return `৳${(farePaisa / 100).toFixed(2)}`;
}

function nextPoolAction(members: PoolMember[]) {
	const statuses = new Set(members.map((member) => member.rideRequest.status));
	if (statuses.size === 0) return null;
	if (
		statuses.has("ACCEPTED") &&
		[...statuses].every((status) => status === "MATCHED" || status === "ACCEPTED")
	) {
			return {
				endpoint: "driver-arrived",
				targetStatus: "DRIVER_ARRIVED",
				label: "Driver Arrived",
			};
	}
	if (statuses.size === 1 && statuses.has("DRIVER_ARRIVED")) {
			return { endpoint: "start", targetStatus: "STARTED", label: "Start Trip" };
	}
	if (statuses.size === 1 && statuses.has("STARTED")) {
			return {
				endpoint: "complete",
				targetStatus: "COMPLETED",
				label: "Complete Trip",
			};
	}
	return null;
}

export default function DriverActiveRidePage() {
	const router = useRouter();
	const params = useParams<{ poolId: string }>();
	const poolId = params.poolId;
	const userName = useSyncExternalStore(
		subscribeToStorage,
		getUserNameSnapshot,
		getServerUserNameSnapshot,
	);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [pool, setPool] = useState<DriverPool | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAdvancing, setIsAdvancing] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let disposed = false;

		async function loadPool() {
			const token = window.localStorage.getItem("token");
			const claims = token ? decodeClaims(token) : null;
			if (!token || claims?.role !== "DRIVER") {
				router.replace("/login");
				setIsLoading(false);
				return;
			}

			try {
				const vehicleResponse = await fetch(`${API_URL}/vehicles/me`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const parsedVehicle = parseVehicle(await readResponse(vehicleResponse));
				if (!parsedVehicle) {
					throw new Error("The server returned invalid vehicle details.");
				}
				const poolsResponse = await fetch(
					`${API_URL}/vehicles/${encodeURIComponent(parsedVehicle.id)}/requests`,
					{ headers: { Authorization: `Bearer ${token}` } },
				);
				const parsedPools = parsePoolList(await readResponse(poolsResponse));
				if (!parsedPools) {
					throw new Error("The server returned an invalid pool list.");
				}
				const selectedPool = parsedPools.find((candidate) => candidate.id === poolId);
				if (!selectedPool) {
					throw new Error("This pool isn't available for your vehicle.");
				}
				if (disposed) return;
				setVehicle(parsedVehicle);
				setPool(selectedPool);
			} catch (loadError) {
				if (!disposed) {
					setError(
						loadError instanceof Error
							? loadError.message
							: "We couldn't load this trip.",
					);
				}
			} finally {
				if (!disposed) setIsLoading(false);
			}
		}

		void loadPool();
		return () => {
			disposed = true;
		};
	}, [poolId, router]);

	async function advanceTrip() {
		if (!vehicle || !pool) return;
		const activeMembers = pool.members.filter((member) => member.isActive);
		const action = nextPoolAction(activeMembers);
		if (!action) return;

		const token = window.localStorage.getItem("token");
		if (!token) {
			router.replace("/login");
			return;
		}

		setError("");
		setIsAdvancing(true);
		try {
			const response = await fetch(
				`${API_URL}/vehicles/${encodeURIComponent(vehicle.id)}/pools/${encodeURIComponent(pool.id)}/${action.endpoint}`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			await readResponse(response);

			const poolsResponse = await fetch(
				`${API_URL}/vehicles/${encodeURIComponent(vehicle.id)}/requests`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			const parsedPools = parsePoolList(await readResponse(poolsResponse));
			if (!parsedPools) {
				throw new Error("The server returned an invalid pool list.");
			}
			const updatedPool = parsedPools.find((candidate) => candidate.id === pool.id);
			if (!updatedPool) {
				throw new Error("This pool isn't available for your vehicle.");
			}
			setPool(updatedPool);
		} catch (advanceError) {
			setError(
				advanceError instanceof Error
					? advanceError.message
					: "We couldn't update the trip status.",
			);
		} finally {
			setIsAdvancing(false);
		}
	}

	function handleLogout() {
		window.localStorage.removeItem("token");
		router.replace("/login");
	}

	const activeMembers = pool?.members.filter((member) => member.isActive) ?? [];
	const statuses = new Set(activeMembers.map((member) => member.rideRequest.status));
	const rideStatus = statuses.size === 1 ? activeMembers[0]?.rideRequest.status ?? null : null;
	const action = nextPoolAction(activeMembers);

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
							<p className="mt-1 text-xs text-[#77847e]">Driver dashboard</p>
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
					<Link
						className="text-xs font-semibold text-[#28715f] underline decoration-[#9fc4b5] underline-offset-4 hover:text-[#174c3f]"
						href="/driver/dashboard"
					>
						Back to dashboard
					</Link>
					<p className="mb-2 mt-5 text-xs font-semibold tracking-[0.17em] text-[#b45836]">
						DRIVER / ACTIVE TRIP
					</p>
					<h1 className="text-3xl font-semibold text-[#18372f] sm:text-4xl">
						Manage trip
					</h1>
					<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
						{pool
							? `${pool.pickupZone} to ${pool.destinationZone}`
							: "Trip details and seat assignments"}
					</p>
				</div>

				{error && (
					<p
						aria-live="polite"
						className="mb-5 max-w-4xl rounded-md border border-[#e7c6bb] bg-[#fff8f5] px-4 py-3 text-sm leading-5 text-[#923f2e]"
						role="alert"
					>
						{error}
					</p>
				)}

				{isLoading ? (
					<section className="flex max-w-4xl items-center gap-3 rounded-lg border border-[#dce5dd] bg-white p-6 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)]">
						<span
							aria-hidden="true"
							className="size-5 animate-spin rounded-full border-2 border-[#1d594a]/20 border-t-[#1d594a]"
						/>
						<p className="text-sm text-[#53675f]">Loading seats…</p>
					</section>
				) : pool && vehicle ? (
					<div className="grid max-w-4xl gap-5 lg:grid-cols-[1.5fr_0.9fr]">
						<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-7">
							<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e8ede9] pb-5">
								<div>
									<p className="font-mono text-[11px] text-[#77847e]">POOL {pool.id}</p>
									<h2 className="mt-2 text-xl font-semibold text-[#18372f]">
										{pool.pickupZone} <span className="px-1 text-[#9aaba2]">→</span> {pool.destinationZone}
									</h2>
								</div>
								<span className="rounded-md bg-[#f0f2ef] px-2.5 py-1.5 text-[11px] font-semibold text-[#66756e]">
									{rideStatus ? rideStatus.replaceAll("_", " ") : pool.status}
								</span>
							</div>

							<div className="mt-5 grid gap-3 sm:grid-cols-2">
								{Array.from({ length: vehicle.capacity }, (_, index) => {
									const seatNumber = index + 1;
									const occupant = activeMembers.find((member) =>
										member.seatNumbers.includes(seatNumber),
									);

									return (
										<div
											className={`min-h-24 rounded-md border p-4 ${occupant ? "border-[#cfe0d2] bg-[#f4f8f3]" : "border-dashed border-[#d5ded7] bg-[#fafbf9]"}`}
											key={seatNumber}
										>
											<div className="flex items-start justify-between gap-3">
												<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
													SEAT {seatNumber}
												</p>
												{occupant && (
													<p className="text-xs font-semibold text-[#1d594a]">
														{formatFare(occupant.farePaisa)}
													</p>
												)}
											</div>
											<p className="mt-3 text-sm font-semibold text-[#18372f]">
												{occupant?.rideRequest.passenger.name ?? "Empty"}
											</p>
										</div>
									);
								})}
							</div>
						</section>

						<aside>
							<section className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-6">
								<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
									TRIP CONTROL
								</p>
								<p className="mt-2 text-sm leading-6 text-[#61746b]">
									{activeMembers.length} active {activeMembers.length === 1 ? "passenger" : "passengers"} · {activeMembers.reduce((total, member) => total + member.seatsRequested, 0)} of {vehicle.capacity} seats
								</p>
								{activeMembers.length === 0 ? (
									<p className="mt-5 rounded-md bg-[#f7f9f6] px-3.5 py-3 text-sm text-[#6d7b75]">
										No active passenger seats in this pool.
									</p>
								) : action ? (
									<button
										className="mt-5 flex h-11 w-full items-center justify-center rounded-md bg-[#1d594a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174a3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d594a] disabled:cursor-not-allowed disabled:opacity-65"
										disabled={isAdvancing}
										onClick={advanceTrip}
										type="button"
									>
										{isAdvancing ? "Updating…" : action.label}
									</button>
								) : rideStatus === "COMPLETED" ? (
									<div className="mt-5 rounded-md bg-[#edf5ee] px-3.5 py-4">
										<p className="text-sm font-semibold text-[#356650]">
											Trip complete
										</p>
										<p className="mt-1 text-xs leading-5 text-[#61746b]">
											All active rides in this pool are completed.
										</p>
										<Link
											className="mt-3 inline-flex text-xs font-semibold text-[#28715f] underline decoration-[#9fc4b5] underline-offset-4 hover:text-[#174c3f]"
											href="/driver/dashboard"
										>
											Back to dashboard
										</Link>
									</div>
								) : (
									<p className="mt-5 rounded-md bg-[#f7f9f6] px-3.5 py-3 text-sm leading-5 text-[#6d7b75]">
										Trip actions are unavailable for the current status.
									</p>
								)}
							</section>
						</aside>
					</div>
				) : (
					<section className="max-w-4xl rounded-lg border border-[#dce5dd] bg-white p-6 text-sm leading-6 text-[#61746b] shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)]">
						Trip details are unavailable.
					</section>
				)}
			</div>
		</main>
	);
}