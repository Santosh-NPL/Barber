/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')], // Add the NativeWind preset
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}', // Include paths to your app files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
