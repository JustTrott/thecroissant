"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
	const router = useRouter();
	const [query, setQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form onSubmit={handleSearch} className="w-full">
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search bakeries..."
					className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500"
				/>
				<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
			</div>
		</form>
	);
}
