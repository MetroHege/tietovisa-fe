# Kymppivisa frontend

Frontend tietovisa [Kymppivisalle](https://kymppivisa.fi/). Tämä on React-sovellus, joka toimii yhdessä [Kymppivisa backendin](https://github.com/TomiHenriksson8/tietovisa-be) kanssa. Tehty Metropolian Mediapalveluprojekti-kurssille.

## Käyttöohjeet

### Riippuvuudet

- [Node.js](https://nodejs.org/en/) ja npm
- [Kymppivisa backend](https://github.com/TomiHenriksson8/tietovisa-be)

### Asennus

1. Kloonaa repositorio
2. Asenna riippuvuudet komennolla `npm install`
3. Luo `.env`-tiedosto projektin juureen ja lisää siihen seuraavat ympäristömuuttujat:
   ```.env
   VITE_AUTH_API=
   VITE_TIETOVISA_API=
   VITE_FORMCARRY_URL=
   ```
4. Käynnistä backend
5. Käynnistä sovellus komennolla `npm run dev`

## Teknologiat

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
