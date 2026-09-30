"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	useCallback,
	useEffect,
	useState,
	useSyncExternalStore,
	type FormEvent,
} from "react";
import { API_URL } from "@/lib/api";

type JwtClaims = {
	userId?: unknown;
	role?: unknown;
	name?: unknown;
};

type Vehicle = {
	id: string;
	capacity: number;
	isOnline: boolean;
};

type PoolMember = {
	seatsRequested: number;
	farePaisa: number;
	seatNumbers: number[];
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
	return typeof vehicle.id === "string" &&
		typeof vehicle.capacity === "number" &&
		typeof vehicle.isOnline === "boolean"
		? {
				id: vehicle.id,
				capacity: vehicle.capacity,
				isOnline: vehicle.isOnline,
			}
		: null;
}

function parsePools(value: unknown): DriverPool[] | null {
	if (!Array.isArray(value)) return null;
	return value as DriverPool[];
}

function canManageTrip(members: PoolMember[]) {
	const tripStatuses = ["ACCEPTED", "DRIVER_ARRIVED", "STARTED", "COMPLETED"];
	return members.length > 0 && members.every((member) =>
		tripStatuses.includes(member.rideRequest.status),
	);
}

export default function DriverDashboardPage() {
	const router = useRouter();
	const userName = useSyncExternalStore(
		subscribeToStorage,
		getUserNameSnapshot,
		getServerUserNameSnapshot,
	);
	const [vehicle, setVehicle] = useState<Vehicle | null>(null);
	const [pools, setPools] = useState<DriverPool[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isToggling, setIsToggling] = useState(false);
	const [capacity, setCapacity] = useState("3");
	const [isRegistering, setIsRegistering] = useState(false);
	const [acceptingPoolId, setAcceptingPoolId] = useState<string | null>(null);
	const [error, setError] = useState("");

	const loadPools = useCallback(async (vehicleId: string, token: string) => {
		const response = await fetch(
			`${API_URL}/vehicles/${encodeURIComponent(vehicleId)}/requests`,
			{ headers: { Authorization: `Bearer ${token}` } },
		);
		const data = await readResponse(response);
		const parsedPools = parsePools(data);
		if (!parsedPools) {
			throw new Error("The server returned an invalid pool list.");
		}
		setPools(parsedPools);
	}, []);

	useEffect(() => {
		let disposed = false;

		async function loadDashboard() {
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
				if (vehicleResponse.status === 404) {
					if (!disposed) {
						setVehicle(null);
						setPools([]);
					}
					return;
				}
				const vehicleData = await readResponse(vehicleResponse);
				const parsedVehicle = parseVehicle(vehicleData);
				if (!parsedVehicle) {
					throw new Error("The server returned invalid vehicle details.");
				}
				if (disposed) return;
				setVehicle(parsedVehicle);
				await loadPools(parsedVehicle.id, token);
			} catch (loadError) {
				if (!disposed) {
					setError(
						loadError instanceof Error
							? loadError.message
							: "We couldn't load your driver dashboard.",
					);
				}
			} finally {
				if (!disposed) setIsLoading(false);
			}
		}

		void loadDashboard();
		return () => {
			disposed = true;
		};
	}, [loadPools, router]);

	async function registerVehicle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const token = window.localStorage.getItem("token");
		if (!token) {
			router.replace("/login");
			return;
		}
		const parsedCapacity = Number(capacity);
		if (!Number.isInteger(parsedCapacity) || parsedCapacity < 1) {
			setError("Vehicle capacity must be at least one seat.");
			return;
		}

		setError("");
		setIsRegistering(true);
		try {
			const response = await fetch(`${API_URL}/vehicles`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ capacity: parsedCapacity }),
			});
			const createdVehicle = parseVehicle(await readResponse(response));
			if (!createdVehicle) {
				throw new Error("The server returned invalid vehicle details.");
			}
			setVehicle(createdVehicle);
			await loadPools(createdVehicle.id, token);
		} catch (registrationError) {
			setError(
				registrationError instanceof Error
					? registrationError.message
					: "We couldn't register your vehicle.",
			);
		} finally {
			setIsRegistering(false);
		}
	}

	async function toggleOnlineStatus() {
		if (!vehicle) return;
		const token = window.localStorage.getItem("token");
		if (!token) {
			router.replace("/login");
			return;
		}

		setError("");
		setIsToggling(true);
		try {
			const response = await fetch(
				`${API_URL}/vehicles/${encodeURIComponent(vehicle.id)}/status`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ isOnline: !vehicle.isOnline }),
				},
			);
			const updatedVehicle = parseVehicle(await readResponse(response));
			if (!updatedVehicle) {
				throw new Error("The server returned invalid vehicle details.");
			}
			setVehicle(updatedVehicle);
		} catch (toggleError) {
			setError(
				toggleError instanceof Error
					? toggleError.message
					: "We couldn't update your vehicle status.",
			);
		} finally {
			setIsToggling(false);
		}
	}

	async function acceptPool(poolId: string) {
		if (!vehicle) return;
		const token = window.localStorage.getItem("token");
		if (!token) {
			router.replace("/login");
			return;
		}

		setError("");
		setAcceptingPoolId(poolId);
		try {
			const response = await fetch(
				`${API_URL}/vehicles/${encodeURIComponent(vehicle.id)}/pools/${encodeURIComponent(poolId)}/accept`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			await readResponse(response);
			await loadPools(vehicle.id, token);
		} catch (acceptError) {
			setError(
				acceptError instanceof Error
					? acceptError.message
					: "We couldn't accept this pool.",
			);
		} finally {
			setAcceptingPoolId(null);
		}
	}

	function handleLogout() {
		window.localStorage.removeItem("token");
		router.replace("/login");
	}

	const activePools = pools.filter((pool) =>
		pool.members.some(
			(member) =>
				member.rideRequest.status !== "COMPLETED" &&
				member.rideRequest.status !== "CANCELLED",
		),
	);

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
				<div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
					<div>
						<p className="mb-2 text-xs font-semibold tracking-[0.17em] text-[#b45836]">
							DRIVER / OVERVIEW
						</p>
						<h1 className="text-3xl font-semibold text-[#18372f] sm:text-4xl">
							Your pools
						</h1>
						<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
							Manage availability and passenger trips.
						</p>
					</div>
					{vehicle && (
						<div className="flex flex-wrap items-center gap-3">
							<span className="rounded-md border border-[#dce5dd] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#61746b] shadow-sm">
								Vehicle · {vehicle.capacity} seats
							</span>
							<button
								aria-checked={vehicle.isOnline}
								aria-label={vehicle.isOnline ? "Set vehicle offline" : "Set vehicle online"}
								className="flex items-center gap-3 rounded-md border border-[#dce5dd] bg-white px-3.5 py-2.5 shadow-sm transition hover:border-[#b8cdbf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f] disabled:cursor-not-allowed disabled:opacity-60"
								disabled={isToggling}
								onClick={toggleOnlineStatus}
								role="switch"
								type="button"
							>
								<span className="text-sm font-medium text-[#36534a]">
									{isToggling ? "Updating…" : vehicle.isOnline ? "Online" : "Offline"}
								</span>
								<span
									aria-hidden="true"
									className={`relative h-6 w-11 rounded-full transition ${vehicle.isOnline ? "bg-[#1d594a]" : "bg-[#c6d0ca]"}`}
								>
									<span
										className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${vehicle.isOnline ? "left-6" : "left-1"}`}
									/>
								</span>
							</button>
						</div>
					)}
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
						<p className="text-sm text-[#53675f]">Loading your pools…</p>
					</section>
				) : !vehicle ? (
					<section className="max-w-2xl rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-7">
						<p className="text-xs font-semibold tracking-[0.14em] text-[#77847e]">
							DRIVER SETUP
						</p>
						<h2 className="mt-2 text-xl font-semibold text-[#18372f]">
							Register Your Vehicle
						</h2>
						<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
							Add a vehicle to start receiving ride requests.
						</p>
						<form className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={registerVehicle}>
							<div className="w-full sm:max-w-xs">
								<label className="mb-2 block text-sm font-medium text-[#263b34]" htmlFor="vehicle-capacity">
									Seat capacity
								</label>
								<input
									className="h-11 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
									id="vehicle-capacity"
									min={1}
									name="capacity"
									onChange={(event) => setCapacity(event.target.value)}
									step={1}
									type="number"
									value={capacity}
								/>
							</div>
							<button
								className="h-11 shrink-0 rounded-md bg-[#1d594a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174a3e] disabled:cursor-not-allowed disabled:opacity-65"
								disabled={isRegistering}
								type="submit"
							>
								{isRegistering ? "Registering…" : "Register Vehicle"}
							</button>
						</form>
					</section>
				) : activePools.length === 0 ? (
					<section className="max-w-4xl rounded-lg border border-[#dce5dd] bg-white px-6 py-12 text-center shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:py-16">
						<div className="mx-auto flex size-12 items-center justify-center rounded-md bg-[#eff5ef] text-lg font-semibold text-[#356650]">
							P
						</div>
						<h2 className="mt-5 text-xl font-semibold text-[#18372f]">
							No active pools yet
						</h2>
						<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6d7b75]">
							New ride requests will appear here when they are matched to your vehicle.
						</p>
					</section>
				) : (
					<div className="max-w-4xl space-y-4">
						{activePools.map((pool) => {
							const activeSeats = pool.members.reduce(
								(total, member) => total + member.seatsRequested,
								0,
							);
							const allMatched = pool.members.every(
								(member) => member.rideRequest.status === "MATCHED",
							);
							const canAccept = allMatched && pool.status === "OPEN";
							const manageTrip = canManageTrip(pool.members);

							return (
								<article
									className="rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:p-6"
									key={pool.id}
								>
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div>
											<p className="font-mono text-[11px] text-[#77847e]">
												POOL {pool.id}
											</p>
											<h2 className="mt-2 text-lg font-semibold text-[#18372f]">
												{pool.pickupZone} <span className="px-1 text-[#9aaba2]">→</span> {pool.destinationZone}
											</h2>
										</div>
										<span
											className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${pool.status === "OPEN" ? "bg-[#edf5ee] text-[#356650]" : "bg-[#f0f2ef] text-[#66756e]"}`}
										>
											{pool.status}
										</span>
									</div>

									<div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8ede9] pt-4">
										<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#61746b]">
											<span>
												{activeSeats} / {pool.vehicle.capacity} seats
											</span>
											<span>
												{pool.members.length} {pool.members.length === 1 ? "passenger" : "passengers"}
											</span>
										</div>
										{canAccept ? (
											<button
												className="rounded-md bg-[#1d594a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174a3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d594a] disabled:cursor-not-allowed disabled:opacity-65"
												disabled={acceptingPoolId === pool.id}
												onClick={() => acceptPool(pool.id)}
												type="button"
											>
												{acceptingPoolId === pool.id ? "Accepting…" : "Accept Pool"}
											</button>
										) : manageTrip ? (
											<Link
												className="rounded-md border border-[#cddbd1] px-4 py-2.5 text-sm font-semibold text-[#36534a] transition hover:border-[#9cb9aa] hover:bg-[#f4f8f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f]"
												href={`/driver/active-ride/${encodeURIComponent(pool.id)}`}
											>
												Manage Trip
											</Link>
										) : (
											<span className="text-xs font-medium text-[#77847e]">
												Waiting for matching
											</span>
										)}
									</div>
									<div className="mt-4 space-y-2">
										{pool.members.map((member) => (
											<div
												className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-[#f7f9f6] px-3.5 py-3"
												key={member.rideRequest.id}
											>
												<div>
													<p className="text-sm font-medium text-[#263b34]">
														{member.rideRequest.passenger.name}
													</p>
													<p className="mt-1 text-xs text-[#77847e]">
														{member.rideRequest.status.replaceAll("_", " ")} · seat{member.seatsRequested === 1 ? "" : "s"} {member.seatNumbers.join(", ")}
													</p>
												</div>
												<p className="text-xs font-semibold text-[#1d594a]">
													{(member.farePaisa / 100).toFixed(2)} BDT
												</p>
											</div>
										))}
									</div>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</main>
	);
}