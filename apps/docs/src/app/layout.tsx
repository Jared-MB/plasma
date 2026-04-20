import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} font-sans`}
			suppressHydrationWarning
		>
			<body className="flex flex-col min-h-screen">
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
