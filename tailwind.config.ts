
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {



      colors: {
   
        primary: "#181b3a",
        primary_heading_color:''
      },
      backgroundImage: {
      
      
        blob: "url('../../src/assets/images/blob.svg')",
        range: "url('/public/images/range.webp')",
        cream_bg:"url('../../src/assets/images/cream.png')"
        
      




      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      "2xl": '1280px',
    },
  },
  plugins: [
    // "#ef4444",
    require('tailwind-scrollbar')({ nocompatible: true }),
    
],
variants: {
  scrollbar: ['rounded']
}
}