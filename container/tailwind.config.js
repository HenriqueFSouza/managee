module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { 
        primary: '#1E3A8A',      // Azul Escuro
        secondary: '#6366F1',    // Azul Claro
        accent: '#4f46e5',       // Azul Muito Claro
        neutral: '#F3F4F6',      // Cinza Claro
        contrast: '#111827', 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
