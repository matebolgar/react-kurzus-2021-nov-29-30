var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// https://reactjs.org/docs/add-react-to-a-website.html

function App() {
  var _React$useState = React.useState("firebrick"),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      color = _React$useState2[0],
      setColor = _React$useState2[1];

  return React.createElement(
    "div",
    null,
    React.createElement(
      "form",
      {
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          setColor(e.target.elements.color.value);
        }
      },
      React.createElement("input", { type: "text", name: "color", className: "form-control" }),
      React.createElement(
        "button",
        { className: "btn btn-primary" },
        "K\xFCld\xE9s"
      )
    ),
    React.createElement(BoxComponent, { szin: color }),
    React.createElement(BoxComponent, { szin: color }),
    React.createElement(BoxComponent, { szin: color })
  );
}

function BoxComponent(props) {
  var _React$useState3 = React.useState(1),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      szam = _React$useState4[0],
      setSzam = _React$useState4[1];

  return React.createElement(
    "div",
    {
      onClick: function onClick() {
        setSzam(function (szam) {
          return szam + 1;
        });
      },
      className: "mb-2",
      style: { width: 200, height: 200, backgroundColor: props.szin }
    },
    szam
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));