function BoxComponent(props) {
  return React.createElement(
    "div",
    {
      style: {
        width: 200,
        height: 200,
        backgroundColor: props.szin,
        marginBottom: 10,
      },
      onClick: () => {},
    },
    props.felirat
  );
}

function AppComponent() {
  return React.createElement(
    "div",
    {},
    React.createElement(BoxComponent, {szin: "red", felirat: 1}),
    React.createElement(BoxComponent, {szin: "green", felirat: 2}),
    React.createElement(BoxComponent, {szin: "blue", felirat: 3}),
  );
}

ReactDOM.render(React.createElement(AppComponent), document.getElementById("app-container"));
