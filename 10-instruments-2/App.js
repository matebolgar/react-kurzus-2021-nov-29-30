var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function App() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      instruments = _React$useState2[0],
      setInstruments = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isPending = _React$useState4[0],
      setPending = _React$useState4[1];

  React.useEffect(function () {
    setPending(true);
    fetch("https://kodbazis.hu/api/instruments", { credentials: "include" }).then(function (res) {
      return res.json();
    }).then(function (content) {
      setInstruments(content);
      setPending(false);
    });
  }, []);

  if (isPending) {
    return React.createElement("div", { className: "spinner-border" });
  }

  return React.createElement(
    "div",
    null,
    instruments.map(function (instrument) {
      return React.createElement(InstrumentCard, { key: instrument.id, hangszer: instrument, setInstruments: setInstruments });
    })
  );
}

function InstrumentCard(_ref) {
  var hangszer = _ref.hangszer,
      setInstruments = _ref.setInstruments;

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isPending = _React$useState6[0],
      setPending = _React$useState6[1];

  return React.createElement(
    "div",
    { className: "card d-inline-block " + (hangszer.price > 300000 ? "text-danger" : ""), style: { width: 200 } },
    React.createElement("img", { className: "card-img-top p-4", src: hangszer.imageURL }),
    React.createElement(
      "div",
      { className: "card-body text-center" },
      React.createElement(
        "h6",
        { className: "card-title" },
        hangszer.brand
      ),
      React.createElement(
        "h5",
        { className: "card-title" },
        hangszer.name
      ),
      React.createElement(
        "p",
        { className: "card-text" },
        "\xC1r: ",
        hangszer.price,
        " Ft -"
      ),
      React.createElement(
        "button",
        {
          onClick: function onClick() {
            setPending(true);
            fetch("https://kodbazis.hu/api/instruments/" + hangszer.id, { credentials: "include", method: "DELETE" }).then(function (res) {
              return fetch("https://kodbazis.hu/api/instruments", {
                credentials: "include"
              });
            }).then(function (res) {
              return res.json();
            }).then(function (instruments) {
              setPending(false);
              setInstruments(instruments);
            });
          },
          disabled: isPending,
          className: ["btn", "btn-danger", "delete-button"].join(" ")
        },
        "T\xF6rl\xE9s"
      )
    )
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));