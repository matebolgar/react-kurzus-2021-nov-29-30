function App() {
  const [instruments, setInstruments] = React.useState([]);
  const [isPending, setPending] = React.useState(false);

  React.useEffect(() => {
    setPending(true);
    fetch("https://kodbazis.hu/api/instruments", { credentials: "include" })
      .then((res) => res.json())
      .then((content) => {
        setInstruments(content);
        setPending(false);
      });
  }, []);

  if (isPending) {
    return <div className="spinner-border"></div>;
  }

  return (
    <div>
      {instruments.map((instrument) => (
        <InstrumentCard key={instrument.id} hangszer={instrument} setInstruments={setInstruments} />
      ))}
    </div>
  );
}

function InstrumentCard({ hangszer, setInstruments }) {
  const [isPending, setPending] = React.useState(false);

  return (
    <div className={"card d-inline-block " + (hangszer.price > 300000 ? "text-danger" : "")} style={{ width: 200 }}>
      <img className="card-img-top p-4" src={hangszer.imageURL} />

      <div className="card-body text-center">
        <h6 className="card-title">{hangszer.brand}</h6>
        <h5 className="card-title">{hangszer.name}</h5>
        <p className="card-text">Ár: {hangszer.price} Ft -</p>
        <button
          onClick={() => {
            setPending(true);
            fetch("https://kodbazis.hu/api/instruments/" + hangszer.id, { credentials: "include", method: "DELETE" })
              .then((res) => {
                return fetch("https://kodbazis.hu/api/instruments", {
                  credentials: "include",
                });
              })
              .then((res) => res.json())
              .then((instruments) => {
                  setPending(false);
                  setInstruments(instruments);
              });
          }}
          disabled={isPending}
          className={["btn", "btn-danger", "delete-button"].join(" ")}
        >
          Törlés
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app-container"));
