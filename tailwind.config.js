/** @type {import('tailwindcss').Config} */
export default {
	content: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'dark-background': '#2C2A4A',
				'dark-container': '#4F518C',
				'action-hover': '#EBD9FC',
				'black-background': '#0E1111',
				'black-container': '#202020',
				'purple-interact': '#907AD6',	
			},
			fontFamily: {
				'SF-Pro': ['SF-Pro', 'sans-serif'], 
			  },
		},
	},
	plugins: [],
}
