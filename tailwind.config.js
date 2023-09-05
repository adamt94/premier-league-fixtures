/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // Using modern `rgb`
      primary: "#005ac1",
      onPrimary: "#ffffff",
      primaryContainer: "#d8e2ff",
      onPrimaryContainer: "#001a41",
      primaryFixed: "#d8e2ff",
      onPrimaryFixed: "#001a41",
      primaryFixedDim: "#adc6ff",
      onPrimaryFixedDim: "#001a41",
      onPrimaryFixedVariant: "#3f4759",
      background: "#fefbff",
      onBackground: "#1b1b1f",
      surfaceTint: "#005ac1",
      surface: "#faf9fd",
      onSurface: "#1b1b1f",
      surfaceVariant: "#e1e2ec",
      onSurfaceVariant: "#44474f",
      surfaceContainer: "#efedf1",
      surfaceContainerHighest: "#e3e2e6",
      surfaceContainerHigh: "#e9e7ec",
      surfaceContainerLow: "#f5f3f7",
      surfaceContainerLowest: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};
