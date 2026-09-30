"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { API_URL } from "@/lib/api";

type UserRole = "PASSENGER" | "DRIVER";

function readTokenRole(token: string): UserRole | null {
	const payload = token.split(".")[1];
	if (!payload) {
		return null;
	}

	try {
		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
		const claims = JSON.parse(
			window.atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
		) as { role?: unknown };
		return claims.role === "PASSENGER" || claims.role === "DRIVER"
			? claims.role
			: null;
	} catch {
		return null;
	}
}

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const result: unknown = await response.json().catch(() => null);

			if (!response.ok) {
				const message =
					typeof result === "object" &&
					result !== null &&
					"error" in result &&
					typeof result.error === "string"
						? result.error
						: "We couldn't sign you in. Check your details and try again.";
				throw new Error(message);
			}

			const token =
				typeof result === "object" &&
				result !== null &&
				"token" in result &&
				typeof result.token === "string"
					? result.token
					: null;
			if (!token) {
				throw new Error("The sign-in response was incomplete. Please try again.");
			}

			const role = readTokenRole(token);
			if (!role) {
				throw new Error("We couldn't verify your account role. Please sign in again.");
			}

			window.localStorage.setItem("token", token);
			router.replace(
				role === "PASSENGER" ? "/passenger/request" : "/driver/dashboard",
			);
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

	return (
		<main className="flex min-h-screen items-center justify-center bg-[#e9efea] px-4 py-7 text-[#182b26] sm:px-8 sm:py-10">
			<section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-[#dce5dd] bg-white shadow-[0_24px_70px_-38px_rgba(20,45,37,0.45)] lg:grid-cols-[1.04fr_0.96fr]">
				<aside className="relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-[#153d34] p-7 text-white sm:p-10 lg:min-h-[650px] lg:p-12">
					<div
						aria-hidden="true"
						className="absolute inset-0 bg-[radial-gradient(#ffffff18_1px,transparent_1px)] bg-size-[22px_22px]"
					/>
					<div className="relative flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-md border border-white/25 bg-white/10 text-sm font-bold tracking-widest text-[#f4c27a]">
							DP
						</div>
						<div className="leading-tight">
							<p className="text-sm font-semibold tracking-[0.16em]">DHAKA</p>
							<p className="mt-1 text-[10px] tracking-[0.22em] text-white/65">
								TESLA POOL
							</p>
						</div>
					</div>

					<div className="relative mt-12 max-w-sm lg:mt-20">
						<p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#f4c27a]">
							YOUR CITY, IN MOTION
						</p>
						<h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl">
							Move well.
							<br />
							Arrive <span className="text-[#f4c27a]">together.</span>
						</h1>
						<p className="mt-5 max-w-xs text-sm leading-6 text-white/72">
							A calmer way across Dhaka starts with a familiar face.
						</p>
					</div>

					<div className="relative mt-12 hidden h-32 max-w-md items-center sm:flex lg:mt-auto lg:pt-16">
						<div className="absolute left-[12%] right-[13%] top-[57%] -rotate-6 border-t border-dashed border-white/35" />
						<div className="absolute left-[28%] top-[32%] h-16 w-24 rotate-12 border-l border-t border-white/20" />
						<div className="relative flex w-full items-center justify-between px-1">
							{["BANANI", "GULSHAN", "MOHAKHALI"].map((place, index) => (
								<div className="flex items-center gap-2" key={place}>
									<span
										className={`size-2.5 rounded-sm border border-[#153d34] ${index === 1 ? "bg-[#f4c27a]" : "bg-white"}`}
									/>
									<span className="text-[9px] font-medium tracking-[0.16em] text-white/70">
										{place}
									</span>
								</div>
							))}
						</div>
					</div>
				</aside>

				<div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
					<div className="w-full max-w-sm">
						<div className="mb-8">
							<p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#b45836]">
								ACCOUNT ACCESS
							</p>
							<h2 className="text-3xl font-semibold tracking-normal text-[#18372f]">
								Welcome back
							</h2>
							<p className="mt-2 text-sm leading-6 text-[#6d7b75]">
								Sign in to continue.
							</p>
						</div>

						<form className="space-y-5" onSubmit={handleSubmit}>
							<div>
								<label
									className="mb-2 block text-sm font-medium text-[#263b34]"
									htmlFor="email"
								>
									Email address
								</label>
								<input
									autoComplete="email"
									className="h-12 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
									id="email"
									name="email"
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									required
									type="email"
									value={email}
								/>
							</div>

							<div>
								<div className="mb-2 flex items-center justify-between gap-4">
									<label
										className="text-sm font-medium text-[#263b34]"
										htmlFor="password"
									>
										Password
									</label>
									<button
										aria-label={showPassword ? "Hide password" : "Show password"}
										className="text-xs font-semibold text-[#28715f] underline decoration-[#9fc4b5] underline-offset-4 hover:text-[#174c3f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28715f]"
										onClick={() => setShowPassword((visible) => !visible)}
										type="button"
									>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>
								<input
									autoComplete="current-password"
									className="h-12 w-full rounded-md border border-[#d8e1db] bg-[#fbfcfa] px-3.5 text-sm text-[#18372f] outline-none transition focus:border-[#23705e] focus:ring-4 focus:ring-[#23705e]/10"
									id="password"
									name="password"
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
									required
									type={showPassword ? "text" : "password"}
									value={password}
								/>
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
								disabled={isSubmitting}
								type="submit"
							>
								{isSubmitting ? "Signing in…" : "Sign in"}
							</button>
						</form>

						<div className="mt-8 flex items-center justify-center gap-1.5 border-t border-[#e8ede9] pt-5 text-sm">
							<span className="text-[#77847e]">New to Dhaka Tesla Pool?</span>
							<Link
								className="font-semibold text-[#28715f] underline decoration-[#9fc4b5] underline-offset-4 hover:text-[#174c3f]"
								href="/signup"
							>
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}