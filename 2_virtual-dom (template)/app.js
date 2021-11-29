// Natív
// Hogyan? (imperatív)
const btn = document.createElement("button");
btn.innerHTML = "Gomb";
btn.onclick = function () {
  alert("Kattintás történt!");
};
document.getElementById("native-button-container").appendChild(btn);

// Mi? (deklaratív)
function Komponens() {
  const reactbtn = React.createElement(
    "button",
    {
      onClick: function () {
        alert("Kattintás történt!");
      },
      className: "btn btn-primary",
    },
    "React-es gomb"
  );

  const wrapper = React.createElement(
    "div",
    {
      style: { width: 100, height: 100 },
      className: "bg-danger",
    },
    reactbtn,
    reactbtn
  );

  return wrapper;
}

// mount
ReactDOM.render(React.createElement(Komponens), document.getElementById("react-button-container"));
