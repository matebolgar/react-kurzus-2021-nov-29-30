function App() {
  const [count, setCount] = React.useState(1);

  React.useEffect(function () {
    // fetch();
    // setState <--- Válasz
  }, []);

  React.useEffect(
    function () {
      document.title = count;
    },
    [count]
  );

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +
      </button>

      <button
        className="btn btn-danger"
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        -
      </button>

      <div className="card display-3">{count}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app-container"));
