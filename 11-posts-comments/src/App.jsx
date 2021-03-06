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

  return (
    <React.Fragment>
      <div>
        Navbar
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

function App() {
  [isMounted, setMounted] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setMounted((prev) => !prev);
        }}
      >
        Toggle PostList
      </button>

      {isMounted ? <PostList /> : "Nincs mountolva a PostList komponens..."}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app-container"));
