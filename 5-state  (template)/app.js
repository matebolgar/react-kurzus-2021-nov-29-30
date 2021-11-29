function BoxComponent(props) {
  const [allapot, ujAllapotBeallitasa] = React.useState(props.felirat);

  return React.createElement(
    "div",
    {
      style: {
        width: 200,
        height: 200,
        backgroundColor: props.szin,
        marginBottom: 10,
      },
      onClick: () => {
        ujAllapotBeallitasa((elozoAllapot) => elozoAllapot + 1);
      },
    },
    allapot
  );
}

function AppComponent() {
  const [color, setColor] = React.useState();

  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, color),
    React.createElement("input", {
      className: "form-control",
      onKeyUp: (e) => {
          if(e.keyCode === 13) {
              setColor(e.target.value);
          }      
      },
    }),
    React.createElement(BoxComponent, { szin: color, felirat: 1 }),
    React.createElement(BoxComponent, { szin: "green", felirat: 2 }),
    React.createElement(BoxComponent, { szin: "blue", felirat: 3 })
  );
}

ReactDOM.render(React.createElement(AppComponent), document.getElementById("app-container"));
