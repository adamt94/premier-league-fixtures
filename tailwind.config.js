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
      outline: "#74777f",

      primaryDark: "#adc6ff",
      onPrimaryDark: "#002e69",
      primaryContainerDark: "#004494",
      onPrimaryContainerDark: "#d8e2ff",
      primaryFixedDark: "#d8e2ff",
      onPrimaryFixedDark: "#001a41",
      primaryFixedDimDark: "#adc6ff",
      onPrimaryFixedDimDark: "#d8e2ff",
      onPrimaryFixedVariantDark: "#004494",
      backgroundDark: "#1b1b1f",
      onBackgroundDark: "#e3e2e6",
      surfaceTintDark: "#adc6ff",
      surfaceDark: "#121316",
      onSurfaceDark: "#c7c6ca",
      surfaceVariantDark: "#44474f",
      onSurfaceVariantDark: "#c4c6d0",
      surfaceContainerDark: "#1f1f23",
      surfaceContainerHighestDark: "#343538",
      surfaceContainerHighDark: "#292a2d",
      surfaceContainerLowDark: "#1b1b1f",
      surfaceContainerLowestDark: "#0d0e11",
      outlineDark: "#8e9099",
    },
    extend: {},
  },
  plugins: [],
};
