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

        'nomura-white': '#FFF',
        'nomura-off-white': '#F9F9F9',
        'nomura-off-grey': '#D1D3D4',
        'nomura-dark-grey': '#323232',
        'nomura-label-grey': '#999',
        'nomura-light-grey' : '#f3f3f3'
      },
      fontSize: {
        "8px": "8px",
        "11px": "11px",
        "10px": "10px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "22px": "22px",
        "24px": "24px",
        "23px": "23px",
        "32px": "32px",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      boxShadow:{
        'card-shadow':'0px 8px 32px 0px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
