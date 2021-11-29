// State (alkalmazás állapot)
const state = {
  counter: 1
}

// Initial render
window.onload = render;

// State változtató mechanizmus
function incrementCounter() {
  state.counter++;

  console.log(state);
  render();
}

// Renderelő mechanizmus
function render() {
  document.getElementById("container").innerHTML = `
    Számláló: ${state.counter}
    <button onclick="incrementCounter()">Inkrementálás</button>
  `;
}

