// https://reactjs.org/docs/add-react-to-a-website.html

function App() {
  const [color, setColor] = React.useState("firebrick");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setColor(e.target.elements.color.value);
        }}
      >
        <input type="text" name="color" className="form-control" />
        <button className="btn btn-primary">Küldés</button>
      </form>
      <BoxComponent szin={color} />
      <BoxComponent szin={color} />
      <BoxComponent szin={color} />
    </div>
  );
}

function BoxComponent(props) {
  const [szam, setSzam] = React.useState(1);

  return (
    <div
      onClick={() => {
        setSzam((szam) => szam + 1);
      }}
      className="mb-2"
      style={{ width: 200, height: 200, backgroundColor: props.szin }}
    >
      {szam}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app-container"));
