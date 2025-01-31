"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";

if (typeof window !== "undefined") {
	const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

	if (apiKey && apiHost) {
		posthog.init(apiKey, {
			api_host: apiHost,
			person_profiles: "always",
		});
	}
}

interface Props {
	children: ReactNode;
}

export function CSPostHogProvider({ children }: Props) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
