// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ Add DaisyUI here
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween"], // ✅ Customize themes
  },
};
