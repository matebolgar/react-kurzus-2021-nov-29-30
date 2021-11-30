// Könyvtárak telepítése: npm i
// Babel indítása: npm run dev

// Kommentek: https://jsonplaceholder.typicode.com/comments
// Posztok: https://jsonplaceholder.typicode.com/posts

class PostList extends React.Component {
  state = {
    pendingId: "",
    comments: [],
    posts: [],
    selectedPostId: "",
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    console.log("Unmount");
  }

  //   React.useEffect(() => {
  // }, [selectedPostId]);
  componentDidUpdate(elozoProps, elozoState) {
    console.log("előző state", elozoState);
    if (elozoState.selectedPostId !== this.state.selectedPostId) {
      this.setState({comments: []});
      fetch("https://jsonplaceholder.typicode.com/comments?postId=" + this.state.selectedPostId)
        .then((res) => res.json())
        .then((comments) => {
          this.setState({comments: comments});
        });
    }
  }

  // Ha a dependency array az üres tömb, akkor az effect csak mountolódáskor fut
  // React.useEffect(() => {
  // }, []);
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        //setPosts(posts);
        this.setState({ posts: posts });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <ul>
            {this.state.posts.map((post) => (
              <li key={post.id} className="list-group-item">
                <h1>{post.id}</h1>
                <p>{post.body}</p>
                <button
                  onClick={() => {
                    this.setState({ selectedPostId: post.id });
                  }}
                  className="btn btn-primary"
                >
                  Kommentek mutatása
                </button>

                {post.id === this.state.selectedPostId ? (
                  <ul>
                    {this.state.comments.map((comment) => (
                      <li key={comment.id} className="list-group-item">
                        {comment.body}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

function App() {
  [isMounted, setMounted] = React.useState(false)
  return <div>
      <button onClick={()=> {
        setMounted(prev => !prev);
      }}>Toggle PostList</button>

      {isMounted ? <PostList /> : "Nincs mountolva a PostList komponens..."}
  </div>
}

ReactDOM.render(<App />, document.getElementById("app-container"));
