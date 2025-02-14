module.exports = {
	darkMode: "class", // Enable dark mode switching via class
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "#ff0808", // Set your primary color
			},
			borderRadius: {
				DEFAULT: "5px", // Set default border radius to 5px
				lg: "10px",
				xl: "15px",
			},
			fontFamily: {
				sans: ["Barlow", "sans-serif"], // Use Barlow font as default
			},
		},
	},
	plugins: [require("daisyui")], // Add DaisyUI
	daisyui: {
		themes: [
			{
				light: {
					primary: "#ff0808",
					secondary: "#ff6363",
					accent: "oklch(86% 0 0/1)",
					neutral: "#333333",
					"base-100": "#ffffff",
					"base-content": "#000000",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
			{
				customDark: {
					...require("daisyui/src/theming/themes")["dark"],
					primary: "#ff0808",
					secondary: "#d95252",
					accent: "rgb(59, 66, 75)",
				},
			},
		],
	},
	darkMode: ["class", '[data-theme="customDark"]'],
};
