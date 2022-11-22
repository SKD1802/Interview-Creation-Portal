module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
 
    extend: {
      colors:{
        'primaryColor':"#0800A5",
        'backdrop':"#CFD7FF"
      },
    },
  },
  variants: {
    extend: {
    
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
