/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
