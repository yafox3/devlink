/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			padding: '2rem',
			center: true
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/forms'),
		'prettier-plugin-tailwindcss',
	]
}
