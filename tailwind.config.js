/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './Views/**/*.html',
    './Views/**/*.ejs',
    './Javascript/**/*.js',
    './Javascript/**/*.jsx',
    './Javascript/**/*.ts',
    './Javascript/**/*.tsx',
    './index.js',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
