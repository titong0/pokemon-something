module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        "bg-pink-300",
        "bg-blue-300",
        "bg-yellow-300",
        "bg-gray-300",
        "bg-red-300",
        "grid-cols-3",
        "grid-cols-2",
        "grid-rows-2",
        "grid-rows-1",
      ],
    },
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
