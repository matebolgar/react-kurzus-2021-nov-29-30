Szerver elindítása:
Töltsd le az alábbi állományt és tömörítsd ki egy mappába
https://kodbazis.hu/public/app/recept-app-szerver.zip

npm install paranccsal telepítsd a harmadik féltől származó könyvtárakat
Ha kész a telepítés, indítsd el a szervert, a node index.js paranccsal
A szerver a http://localhost:9090 URL-en fogadja a kéréseket


Megszólítható endpointok:
Method	Útvonal	Funkcionalitás

GET	"/api/recipes"	Összes recept kilistázása
GET	"/api/recipes/:recipeSlug"	Egyetlen recept lekérése slug alapján
POST	"/api/recipes"	Új recept létrehozása
PUT	"/api/recipes/:id"	Recept felülírása id alapján
DELETE	"/api/recipes/:id"	Recept törlése id alapján


Ajánlott komponens felosztás:
 App
 Home
 RecipeList
 RecipeSingle
 RecipeCreate
 RecipeEdit
 Modal
 Spinner
 

Harmadik féltől származó könyvtárak:

Create React App:

npx create-react-app .
 

Ikonok:

npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
 

Útvonalválasztó:

npm i --save react-router-dom
 

Megjelenés:

npm i --save bootstrap
 
Sok sikert!
