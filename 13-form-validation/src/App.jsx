// Könyvtárak telepítése: npm i
// Babel indítása: npm run dev

// Kommentek: https://jsonplaceholder.typicode.com/comments
// Posztok: https://jsonplaceholder.typicode.com/posts

function PostList() {
  const [pendingId, setPendingId] = React.useState("");

  const [comments, setComments] = React.useState([]);
  const [selectedPostId, setSelectedPostId] = React.useState("");

  React.useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setComments([]);
    fetch("http://jsonplaceholder.typicode.com/comments?postId=" + selectedPostId)
      .then((res) => res.json())
      .then((comments) => {
        setComments(comments);
      });
  }, [selectedPostId]);

  const [posts, setPosts] = React.useState([]);

  // Ha a dependency array az üres tömb, akkor az effect csak mountolódáskor fut
  React.useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });

    // Cleanup function
    return function () {
      /*
        Ha a dependency array az üres tömb és megadsz cleanup function-t, akkor 
        ez a komponens unmountolódásakor fut le (ugyanaz mint a componentWillUnmount)
        */
      console.log("Unmount történt");
    };
  }, []);

  const [title, setTitle] = React.useState("");
  const [isTitleError, setTitleError] = React.useState(false);
  const [isInvalidCharacterError, setInvalidCharacterError] = React.useState(false);

  React.useEffect(() => {
    setTitleError(title.length > 10);
  }, [title]);

  // (string, Array<string>) -> bool
  function containsInvalidChar(str, blacklist) {
    return str.split("").some((char) => blacklist.includes(char))
  }

  React.useEffect(() => {
    const characterBlackList = ["<", ">", "&", "@"];
    setInvalidCharacterError(containsInvalidChar(title, characterBlackList));
  }, [title]);

  const [body, setBody] = React.useState("");
  React.useEffect(() => {
    console.log(body);
  }, [body]);

  return (
    <React.Fragment>
      <div>
        <h1>Új poszt</h1>
        <form className="card m-3">
          <input
            className={"form-control m-2 " + (isTitleError || isInvalidCharacterError ? "border border-danger" : "")}
            type="text"
            name="title"
            placeholder="Cím"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          {isTitleError ? <p className="text-danger">Hiba! Cím hosszabb mint 10 karakter...</p> : ""}
          {isInvalidCharacterError ? <p className="text-danger">Invalid karakter...</p> : ""}

          <textarea
            className="form-control m-2"
            type="text"
            name="body"
            placeholder="Tartalom"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>

          <button className="btn btn-success">Küldés</button>
        </form>
        <ul>
          {posts.map((post) => (
            <ListItem
              key={post.id}
              post={post}
              comments={selectedPostId === "" ? [] : comments}
              setSelectedPostId={setSelectedPostId}
              selectedPostId={selectedPostId}
            />
          ))}
        </ul>
        Footer
      </div>
    </React.Fragment>
  );
}

function ListItem(props) {
  const { post, comments, setSelectedPostId, selectedPostId } = props;

  return (
    <li className="list-group-item">
      <h1>{post.id}</h1>
      <p>{post.body}</p>
      <button
        onClick={() => {
          setSelectedPostId(post.id);
        }}
        className="btn btn-primary"
      >
        Kommentek mutatása
      </button>

      {post.id === selectedPostId ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              {comment.body}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
}

ReactDOM.render(<PostList />, document.getElementById("app-container"));
