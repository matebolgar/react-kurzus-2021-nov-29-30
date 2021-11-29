"use strict";

// https://reactjs.org/docs/add-react-to-a-website.html
function App() {
  const [color, setColor] = React.useState("blue");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setColor(e.target.elements.color.value);
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "color",
    className: "form-control"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary"
  }, "K\xFCld\xE9s")), /*#__PURE__*/React.createElement(BoxComponent, {
    szin: color
  }), /*#__PURE__*/React.createElement(BoxComponent, {
    szin: color
  }), /*#__PURE__*/React.createElement(BoxComponent, {
    szin: color
  }));
}

function BoxComponent(props) {
  const [szam, setSzam] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setSzam(szam => szam + 1);
    },
    className: "mb-2",
    style: {
      width: 200,
      height: 200,
      backgroundColor: props.szin
    }
  }, szam);
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app-container"));