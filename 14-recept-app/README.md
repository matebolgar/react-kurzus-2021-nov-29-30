# Recept App önálló feladat

## Szerver elindítása:

Telepítsd a harmadik féltől származó könyvtárakat `npm install` paranccsal <br />
Ha kész a telepítés, indítsd el a szervert, a `node index.js` paranccsal <br />
A szerver a http://localhost:9090 URL-en fogadja a kéréseket

## Megszólítható endpointok:

| Method | Útvonal | Funkcionalitás |
| --- | ----------- | ------------- |
| GET | `/api/recipes` | Összes recept kilistázása |
| GET | `/api/recipes/:receptSlug` | Egyetlen recept lekérése keresőbarát név alapján |
| POST | `/api/recipes` | Új recept létrehozása |
| PUT | `/api/recipes/:id` | Recept felülírása id alapján |
| DELETE | `/api/recipes/:id` | Recept törlése id alapján |

<br />
A képek a "/static/images" publikus mappába mentődnek, így a React appodból innen tudod őket megszerezni. <br />

Az egyéb statikus fájlok (pl a logó), a "/static/assets" mappából nyerhetőek ki! <br />

## Ajánlott komponens felosztás: <br />
- App
- Home
- RecipeList
- RecipeSingle
- RecipeCreate
- RecipeEdit
- Modal
- Spinner

### Sablonok:
Az egyes komponensekhez a `/app/src/sablonok` mappában lévő statikus HTML fájlokat tudod alapul venni!

## Harmadik féltől származó könyvtárak:

### Create React App:

`npx create-react-app .`

### Ikonok:

`npm i --save @fortawesome/fontawesome-svg-core` <br/>
`npm i --save @fortawesome/free-solid-svg-icons` <br/>
`npm i --save @fortawesome/react-fontawesome` <br/>

## Útvonalválasztó:

`npm i --save react-router-dom`

## Megjelenés:

`npm i --save bootstrap`

<br/>

# Sok sikert!
