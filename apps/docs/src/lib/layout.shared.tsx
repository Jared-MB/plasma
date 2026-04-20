import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions({
	renderLinks = true,
}: {
	renderLinks?: boolean;
} = {}): BaseLayoutProps {
	return {
		nav: {
			title: (
				<span className="font-mono text-xl font-semibold">
					{appName}
				</span>
			),
		},
		links: renderLinks
			? [
					{
						text: "Docs",
						url: "/docs",
					},
				]
			: [],
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
	};
}
