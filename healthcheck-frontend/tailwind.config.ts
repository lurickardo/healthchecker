import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				poppins: ["Poppins", ...fontFamily.sans],
			},
			fontSize: {
				xs: ".75rem",
				sm: ".875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "1.875rem",
				"4xl": "2.25rem",
				"5xl": "3rem",
				"6xl": "4rem",
				"7xl": "5rem",
			},
			colors: {
				"hc-black-500": "#0D0E12",
				"hc-black-400": "#141419",
				"hc-black-300": "#232222",
				"hc-black-200": "#2A2A32",

				"hc-gray-500": "#404040",
				"hc-gray-400": "#666666",
				"hc-gray-100": "#DADADA",

				"hc-purple-800": "#160B29",
				"hc-purple-700": "#1E0D3A",
				"hc-purple-600": "#341665",
				"hc-purple-500": "#400C95",
				"hc-purple-400": "#511CA9",
				"hc-purple-300": "#622ABE",
				"hc-purple-200": "#853AFF",
				"hc-purple-100": "#9453FF",
				"hc-purple-50": "#a27cfc",

				"hc-blue-200": "#00B2FF",

				"hc-green-500": "#6E9319",
				"hc-green-400": "#87AE2D",
				"hc-green-300": "#A2D729",
				"hc-green-100": "#b8ffad",

				"hc-red-400": "#991B1B",
				"hc-red-300": "#B91C1C",
				"hc-red-200": "#DC2626",
				"hc-red-100": "#EF4444",

				"hc-yellow-400": "#99881b",
				"hc-yellow-100": "#efd844",

				"hc-blue-400": "#554dff",
				"hc-blue-100": "#6d68ff",


				"hc-white-300": "#efefef",
				"hc-white-200": "#F2F2F2",
				"hc-white-100": "#FFFFFF",

				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			height: {
				"grid-rows-sidebar": "calc(100vh - 4rem)",
				"table": "calc(100vh - 14rem)",
			},
			width: {
				"default": "calc(100vw - 8rem)",
				"sideBarOpen": "calc(100vw - 22.5rem)",
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
