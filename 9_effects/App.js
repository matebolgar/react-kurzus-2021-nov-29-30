var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function App() {
  var _React$useState = React.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      count = _React$useState2[0],
      setCount = _React$useState2[1];

  React.useEffect(function () {
    // fetch();
    // setState <--- Válasz
  }, []);

  React.useEffect(function () {
    document.title = count;
  }, [count]);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        className: "btn btn-success",
        onClick: function onClick() {
          setCount(function (prev) {
            return prev + 1;
          });
        }
      },
      "+"
    ),
    React.createElement(
      "button",
      {
        className: "btn btn-danger",
        onClick: function onClick() {
          setCount(function (prev) {
            return prev - 1;
          });
        }
      },
      "-"
    ),
    React.createElement(
      "div",
      { className: "card display-3" },
      count
    )
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));