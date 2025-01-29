import { Github, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-black text-white mt-16">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand Section */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-amber-500">
							The Croissant
						</h3>
						<p className="text-gray-400">
							Discovering and reviewing the best croissants in
							town.
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-400 hover:text-amber-500 transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/leaderboard"
									className="text-gray-400 hover:text-amber-500 transition-colors"
								>
									Leaderboard
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact & Social */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Connect</h3>
						<div className="flex flex-col space-y-2">
							<a
								href="https://github.com/JustTrott/thecroissant"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
							>
								<Github className="h-5 w-5" />
								<span>GitHub</span>
							</a>
							<a
								href="mailto:contact@thecroissant.com"
								className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
							>
								<Mail className="h-5 w-5" />
								<span>Contact Us</span>
							</a>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
					<p>
						© {new Date().getFullYear()} The Croissant. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
