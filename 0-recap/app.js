// 1. DOM manipuláció

const container = document.getElementById("container");

console.log(container);
console.dir(container);

container.classList.add("list-group-item");

container.style.background = "red";
container.innerHTML = "Teszt...";

// 2. AJAX kérés

function sendRequest(url, method, callback) {
  const req = new XMLHttpRequest();

  // Szinkron
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      const responseBody = req.responseText;
      const instruments = JSON.parse(responseBody);
      // Aszinkron
      callback(instruments);
    }
  };

  // Szinkron
  req.open(method, url);
  // Szinkron
  req.send();
}

// Szinkron
// sendRequest("https://kodbazis.hu/api/instruments", "GET", function (response) {
//   // Aszinkron
//   console.log(response);
// });

// Callback hell - pyramid of doom
// 3. AJAX kérés + DOM manipuláció
// sendRequest("https://kodbazis.hu/api/instruments", "GET", function (response) {
//   if (!response.error) {
//     // Aszinkron
//     const id = response[3].id;
//     console.log(id);
//     sendRequest("https://kodbazis.hu/api/instruments/" + id, "GET", function (masodikValasz) {
//       if (!masodikValasz.error) {
//         console.log(masodikValasz);
//         //   document.getElementById("instrument-list").innerHTML = htmlContent;
//       } else {
//         alert("Hiba");
//       }
//     });
//   } else {
//     alert("Hiba");
//   }
// });

// Promise - async await
function sendRequest2(url, method) {
  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();

    // Szinkron
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status == 200) {
          const responseBody = req.responseText;
          const body = JSON.parse(responseBody);
          // Aszinkron
          resolve(body);
        } else {
          reject("error");
        }
      }
    };
    // Szinkron
    req.open(method, url);
    // Szinkron
    req.send();
  });
}

fetch("https://kodbazis.hu/api/instruments")
  .then(function (valasz) {
    return valasz.json();
  })
  .then(function (valasz) {
    const id = valasz[5].id;
    return fetch("https://kodbazis.hu/api/instruments/" + id);
  })
  .then(function (valasz) {
    return valasz.json();
  })
  .then(function (valasz2) {
    // console.log(valasz2);
    document.getElementById("instrument-list").innerHTML = valasz2.description;
  })
  .then(function () {
    // console.log("Kész");
  })
  .catch(function (hiba) {
    // console.log(hiba);
  });

  // async await - syntactic sugar

  async function teszt() {
      try {
          const res =  await fetch("https://kodbazis.hu/api/instruments");
          const hangszerek = await res.json();
      
          const valasz2 = await fetch("https://kodbazis.hu/api/instruments/" + hangszerek[3].id)
          .then(res => res.json());
          return valasz2;
      } catch(e) {
          console.log(e);
      }
  }

teszt().then(adat => {
    console.log(adat);
})



// Array destructuring

const [elso, masodik, harmadik] = ["elso elem", "masodik123", "harmadik234"];

console.log(elso);
console.log(masodik);
console.log(harmadik);

function teszt2([a, b, c]) {
    console.log(a);
    console.log(b);
    console.log(c);
}
const tomb = ["elso elem", "masodik123", "harmadik234"];
teszt2(tomb);

// Object destructuring
const person = {
    name: "Gipsz Jakab",
    age: 30,
    isAdmin: true,
}

const {name, age, isAdmin} = person;

console.log(person.name);
console.log(person.age);
console.log(person.isAdmin);

console.log(name);






