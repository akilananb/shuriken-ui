/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{html,jsx}',
    './src/components/**/*.{html,jsx}',
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        'light-red': '#FFEDED',
        'nomura-red': '#D71133',

        'nomura-off-white': '#F9F9F9',
        'nomura-off-grey': '#D1D3D4',
        'nomura-dark-grey': '#323232',
      },
    },
  },
  plugins: [],
}

