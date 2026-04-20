import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Cog, Layers } from "lucide-react";

export default function HomePage() {
	return (
		<main className="flex flex-col min-h-screen bg-white dark:bg-[#000000] text-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
			{/* Background decoration */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
				<div className="absolute top-0 w-[800px] h-[400px] bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-900 opacity-50 blur-3xl -translate-y-1/2 rounded-full" />
			</div>

			<div className="relative z-10 container max-w-6xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
				<div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-md mb-8">
					<span className="flex h-2 w-2 rounded-full bg-zinc-950 dark:bg-zinc-50 mr-2" />
					Plasma v1.0.0 is now available
				</div>

				<h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 text-balance">
					End-to-End Type Safety. <br className="hidden sm:block" />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-950 dark:from-zinc-400 dark:to-white">
						Zero Codegen.
					</span>
				</h1>

				<p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 text-balance leading-relaxed">
					The most developer-friendly HTTP client for your full-stack
					applications. Bring your Zod schemas and get complete
					type-safety from client to server instantly.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<Link
						href="/docs/getting-started"
						className="inline-flex justify-center items-center h-12 px-8 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
					>
						Get Started
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
					<Link
						href="/docs"
						className="inline-flex justify-center items-center h-12 px-8 rounded-full bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
					>
						Read the Docs
					</Link>
				</div>
			</div>

			{/* Code Showcase Section */}
			<section className="relative z-10 container max-w-4xl mx-auto px-6 py-12">
				<div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden shadow-2xl backdrop-blur-sm">
					<div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-[#0a0a0a]">
						<div className="flex gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500/80" />
							<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
							<div className="w-3 h-3 rounded-full bg-green-500/80" />
						</div>
						<div className="mx-auto text-xs font-mono text-zinc-500">
							client.ts
						</div>
					</div>
					<div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
						<pre className="text-zinc-800 dark:text-zinc-300">
							<span className="text-pink-600 dark:text-pink-400">
								import
							</span>{" "}
							{"{ createHttpClient }"}{" "}
							<span className="text-pink-600 dark:text-pink-400">
								from
							</span>{" "}
							<span className="text-emerald-600 dark:text-emerald-400">
								'@crm/plasma'
							</span>
							;{"\n"}
							<span className="text-pink-600 dark:text-pink-400">
								import
							</span>{" "}
							{"{ APP_ROUTES }"}{" "}
							<span className="text-pink-600 dark:text-pink-400">
								from
							</span>{" "}
							<span className="text-emerald-600 dark:text-emerald-400">
								'./routes'
							</span>
							;{"\n"}
							{"\n"}
							<span className="text-pink-600 dark:text-pink-400">
								export const
							</span>{" "}
							client ={" "}
							<span className="text-blue-600 dark:text-blue-400">
								createHttpClient
							</span>
							({"{"}
							{"\n"}
							{"  "}serverUrl: process.env.
							<span className="text-violet-600 dark:text-violet-400">
								API_URL
							</span>
							,{"\n"}
							{"  "}routes: APP_ROUTES,{"\n"}
							{"}"});{"\n"}
							{"\n"}
							<span className="text-pink-600 dark:text-pink-400">
								const
							</span>{" "}
							[error, data] ={" "}
							<span className="text-pink-600 dark:text-pink-400">
								await
							</span>{" "}
							client.
							<span className="text-blue-600 dark:text-blue-400">
								GET
							</span>
							(
							<span className="text-emerald-600 dark:text-emerald-400">
								'get-users'
							</span>
							, {"{"}
							{"\n"}
							{"  "}params: {"{"} role:{" "}
							<span className="text-emerald-600 dark:text-emerald-400">
								'admin'
							</span>{" "}
							{"}"},{"\n"}
							{"}"});
						</pre>
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<section className="relative z-10 container max-w-6xl mx-auto px-6 py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<FeatureCard
						icon={<ShieldCheck className="h-6 w-6" />}
						title="Type-Safe RPC"
						description="End-to-end type safety without the overhead. Define your routes once, use them everywhere with perfect autocompletion."
					/>
					<FeatureCard
						icon={<Zap className="h-6 w-6" />}
						title="Zero Codegen"
						description="Stop generating types. Plasma infers everything directly from your route definitions and Zod schemas in real-time."
					/>
					<FeatureCard
						icon={<Layers className="h-6 w-6" />}
						title="First-Class Zod"
						description="Native integration with Zod. Automatically validate and coerce query parameters and request payloads."
					/>
					<FeatureCard
						icon={<Cog className="h-6 w-6" />}
						title="Interceptors"
						description="Powerful async interceptors for requests and responses. Easily manage auth tokens, logging, and global error handling."
					/>
					<FeatureCard
						icon={<ArrowRight className="h-6 w-6" />}
						title="Go-Style Errors"
						description="Say goodbye to try/catch blocks. Plasma returns [error, data] tuples for predictable and clean error handling."
					/>
					<FeatureCard
						icon={<ShieldCheck className="h-6 w-6" />}
						title="Framework Agnostic"
						description="Built on standard Web APIs (fetch, Headers). Works seamlessly with Next.js, TanStack Start, Remix, or vanilla React."
					/>
				</div>
			</section>
		</main>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] hover:bg-zinc-50 dark:hover:bg-[#111] transition-colors">
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent dark:from-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
			<div className="relative z-10">
				<div className="flex items-center justify-center h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#000] shadow-sm text-zinc-950 dark:text-zinc-50 mb-6 group-hover:scale-110 transition-transform duration-300">
					{icon}
				</div>
				<h3 className="text-xl font-semibold mb-3">{title}</h3>
				<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
					{description}
				</p>
			</div>
		</div>
	);
}
