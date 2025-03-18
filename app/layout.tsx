import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
	title: "ColorConverter",
	description: "A Color Converter Tool",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<link rel="icon" href="/favicon.ico" />
			<body>{children}</body>
		</html>
	);
}
