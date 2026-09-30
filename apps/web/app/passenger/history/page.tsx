"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const API_BASE_URL = (
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
const PAGE_SIZE = 20;

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

type RideHistoryItem = {
	id: string;
	passengerId: string;
	pickupZone: string;
	destinationZone: string;
	seatsRequested: number;
	status: RideStatus;
	createdAt: string;
	member: { farePaisa: number } | null;
};

type HistoryPage = {
	items: RideHistoryItem[];
	total: number;
	limit: number;
	offset: number;
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

function parseHistoryPage(result: unknown): HistoryPage | null {
	if (typeof result !== "object" || result === null) {
		return null;
	}

	const page = result as Partial<HistoryPage>;
	if (
		!Array.isArray(page.items) ||
		typeof page.total !== "number" ||
		typeof page.limit !== "number" ||
		typeof page.offset !== "number"
	) {
		return null;
	}

	const items: RideHistoryItem[] = [];
	for (const candidate of page.items) {
		if (typeof candidate !== "object" || candidate === null) {
			return null;
		}
		const item = candidate as Partial<RideHistoryItem>;
		if (
			typeof item.id !== "string" ||
			typeof item.passengerId !== "string" ||
			typeof item.pickupZone !== "string" ||
			typeof item.destinationZone !== "string" ||
			typeof item.seatsRequested !== "number" ||
			typeof item.createdAt !== "string" ||
			Number.isNaN(Date.parse(item.createdAt)) ||
			!isRideStatus(item.status)
		) {
			return null;
		}

		const member = item.member;
		items.push({
			id: item.id,
			passengerId: item.passengerId,
			pickupZone: item.pickupZone,
			destinationZone: item.destinationZone,
			seatsRequested: item.seatsRequested,
			createdAt: item.createdAt,
			status: item.status,
			member:
				typeof member === "object" &&
				member !== null &&
				typeof member.farePaisa === "number"
					? { farePaisa: member.farePaisa }
					: null,
		});
	}

	return {
		items,
		total: page.total,
		limit: page.limit,
		offset: page.offset,
	};
}

function formatFare(farePaisa: number) {
	return `৳${(farePaisa / 100).toFixed(2)}`;
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat("en-BD", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function statusStyles(status: RideStatus) {
	switch (status) {
		case "COMPLETED":
			return "bg-[#edf5ee] text-[#356650]";
		case "CANCELLED":
			return "bg-[#fff2ed] text-[#923f2e]";
		case "STARTED":
			return "bg-[#eaf2f5] text-[#356176]";
		default:
			return "bg-[#fbf5e8] text-[#80642e]";
	}
}

function statusLabel(status: RideStatus) {
	return status.replaceAll("_", " ");
}

function responseErrorMessage(result: unknown) {
	if (
		typeof result === "object" &&
		result !== null &&
		"error" in result &&
		typeof result.error === "string"
	) {
		return result.error;
	}
	return "We couldn't load your ride history. Please try again.";
}

export default function PassengerHistoryPage() {
	const router = useRouter();
	const userName = useSyncExternalStore(
		subscribeToStorage,
		getUserNameSnapshot,
		getServerUserNameSnapshot,
	);
	const [rides, setRides] = useState<RideHistoryItem[]>([]);
	const [total, setTotal] = useState(0);
	const [nextOffset, setNextOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let disposed = false;

		async function loadFirstPage() {
			const token = window.localStorage.getItem("token");
			const claims = token ? decodeClaims(token) : null;
			if (
				!token ||
				typeof claims?.userId !== "string" ||
				claims.role !== "PASSENGER"
			) {
				router.replace("/login");
				setIsLoading(false);
				return;
			}

			try {
				const response = await fetch(
					`${API_BASE_URL}/rides/history?limit=${PAGE_SIZE}&offset=0`,
					{ headers: { Authorization: `Bearer ${token}` } },
				);
				const result: unknown = await response.json().catch(() => null);
				if (disposed) {
					return;
				}

				if (!response.ok) {
					setError(responseErrorMessage(result));
					if (response.status === 401) {
						router.replace("/login");
					}
					return;
				}

				const page = parseHistoryPage(result);
				if (!page) {
					setError("The server returned an incomplete ride history.");
					return;
				}
				if (page.items.some((ride) => ride.passengerId !== claims.userId)) {
					setError("The history response included a ride outside your account.");
					return;
				}

				setRides(page.items);
				setTotal(page.total);
				setNextOffset(page.offset + page.items.length);
			} catch {
				if (!disposed) {
					setError("Connection problem. Check that the API is available and try again.");
				}
			} finally {
				if (!disposed) {
					setIsLoading(false);
				}
			}
		}

		void loadFirstPage();
		return () => {
			disposed = true;
		};
	}, [router]);

	async function loadMore() {
		const token = window.localStorage.getItem("token");
		const claims = token ? decodeClaims(token) : null;
		if (!token || typeof claims?.userId !== "string" || claims.role !== "PASSENGER") {
			router.replace("/login");
			return;
		}

		setError("");
		setIsLoadingMore(true);
		try {
			const response = await fetch(
				`${API_BASE_URL}/rides/history?limit=${PAGE_SIZE}&offset=${nextOffset}`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			const result: unknown = await response.json().catch(() => null);
			if (!response.ok) {
				throw new Error(responseErrorMessage(result));
			}

			const page = parseHistoryPage(result);
			if (!page) {
				throw new Error("The server returned an incomplete ride history.");
			}
			if (page.items.some((ride) => ride.passengerId !== claims.userId)) {
				throw new Error("The history response included a ride outside your account.");
			}

			setRides((existing) => [...existing, ...page.items]);
			setTotal(page.total);
			setNextOffset(page.offset + page.items.length);
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: "We couldn't load more rides. Please try again.",
			);
		} finally {
			setIsLoadingMore(false);
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
				<div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
					<div>
						<p className="mb-2 text-xs font-semibold tracking-[0.17em] text-[#b45836]">
							PASSENGER / TRIP HISTORY
						</p>
						<h1 className="text-3xl font-semibold text-[#18372f] sm:text-4xl">
							Your rides
						</h1>
						<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
							A record of your ride requests.
						</p>
					</div>
					<Link
						className="rounded-md bg-[#1d594a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174a3e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d594a]"
						href="/passenger/request"
					>
						Request a ride
					</Link>
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
						<p className="text-sm text-[#53675f]">Loading your rides…</p>
					</section>
				) : rides.length === 0 && !error ? (
					<section className="max-w-4xl rounded-lg border border-[#dce5dd] bg-white px-6 py-12 text-center shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] sm:py-16">
						<div className="mx-auto flex size-12 items-center justify-center rounded-md bg-[#eff5ef] text-lg font-semibold text-[#356650]">
							R
						</div>
						<h2 className="mt-5 text-xl font-semibold text-[#18372f]">
							No rides yet
						</h2>
						<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6d7b75]">
							Your ride requests will appear here after you plan your first trip.
						</p>
						<Link
							className="mt-6 inline-flex rounded-md bg-[#1d594a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174a3e]"
							href="/passenger/request"
						>
							Plan a ride
						</Link>
					</section>
				) : rides.length > 0 ? (
					<div className="max-w-4xl space-y-4">
						{rides.map((ride) => (
							<Link
								className="block rounded-lg border border-[#dce5dd] bg-white p-5 shadow-[0_12px_35px_-28px_rgba(20,45,37,0.45)] transition hover:border-[#b8cdbf] hover:shadow-[0_16px_38px_-28px_rgba(20,45,37,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f] sm:p-6"
								href={`/passenger/status/${encodeURIComponent(ride.id)}`}
								key={ride.id}
							>
								<div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e8ede9] pb-4">
									<div>
										<p className="font-mono text-[11px] text-[#77847e]">
											{ride.id}
										</p>
										<p className="mt-1 text-xs text-[#6d7b75]">
											{formatDate(ride.createdAt)}
										</p>
									</div>
									<span
										className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles(ride.status)}`}
									>
										{statusLabel(ride.status)}
									</span>
								</div>

								<div className="grid gap-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
									<div>
										<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
											PICKUP
										</p>
										<p className="mt-1 font-semibold text-[#18372f]">
											{ride.pickupZone}
										</p>
									</div>
									<div aria-hidden="true" className="hidden h-px w-10 bg-[#c8d8cd] sm:block" />
									<div>
										<p className="text-[10px] font-semibold tracking-[0.14em] text-[#77847e]">
											DESTINATION
										</p>
										<p className="mt-1 font-semibold text-[#18372f]">
											{ride.destinationZone}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8ede9] pt-4">
									<div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6d7b75]">
										<span>
											{ride.seatsRequested} {ride.seatsRequested === 1 ? "seat" : "seats"}
										</span>
										<span>
											{ride.member ? formatFare(ride.member.farePaisa) : "Fare pending"}
										</span>
									</div>
									<span className="text-xs font-semibold text-[#28715f]">
										View ride
									</span>
								</div>
							</Link>
						))}

						<p className="px-1 text-xs text-[#77847e]">
							Showing {rides.length} of {total} {total === 1 ? "ride" : "rides"}
						</p>

						{rides.length < total && (
							<button
								className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#cddbd1] bg-white px-4 text-sm font-semibold text-[#36534a] transition hover:border-[#9cb9aa] hover:bg-[#f7faf7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f] disabled:cursor-not-allowed disabled:opacity-65"
								disabled={isLoadingMore}
								onClick={loadMore}
								type="button"
							>
								{isLoadingMore && (
									<span
										aria-hidden="true"
										className="size-4 animate-spin rounded-full border-2 border-[#1d594a]/20 border-t-[#1d594a]"
									/>
								)}
								{isLoadingMore ? "Loading more…" : "Load more rides"}
							</button>
						)}
					</div>
				) : null}
			</div>
		</main>
	);
}