var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Könyvtárak telepítése: npm i
// Babel indítása: npm run dev

// Kommentek: https://jsonplaceholder.typicode.com/comments
// Posztok: https://jsonplaceholder.typicode.com/posts

function PostList() {
  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      pendingId = _React$useState2[0],
      setPendingId = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      comments = _React$useState4[0],
      setComments = _React$useState4[1];

  var _React$useState5 = React.useState(""),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      selectedPostId = _React$useState6[0],
      setSelectedPostId = _React$useState6[1];

  React.useEffect(function () {
    if (!selectedPostId) {
      return;
    }

    setComments([]);
    fetch("https://jsonplaceholder.typicode.com/comments?postId=" + selectedPostId).then(function (res) {
      return res.json();
    }).then(function (comments) {
      setComments(comments);
    });
  }, [selectedPostId]);

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      posts = _React$useState8[0],
      setPosts = _React$useState8[1];

  // Ha a dependency array az üres tömb, akkor az effect csak mountolódáskor fut


  React.useEffect(function () {
    fetch("https://jsonplaceholder.typicode.com/posts").then(function (res) {
      return res.json();
    }).then(function (posts) {
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

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "ul",
        null,
        posts.map(function (post) {
          return React.createElement(
            "li",
            { key: post.id, className: "list-group-item" },
            React.createElement(
              "h1",
              null,
              post.id
            ),
            React.createElement(
              "p",
              null,
              post.body
            ),
            React.createElement(
              "button",
              {
                onClick: function onClick() {
                  setSelectedPostId(post.id);
                },
                className: "btn btn-primary"
              },
              "Kommentek mutat\xE1sa"
            ),
            post.id === selectedPostId ? React.createElement(
              "ul",
              null,
              comments.map(function (comment) {
                return React.createElement(
                  "li",
                  { className: "list-group-item" },
                  comment.body
                );
              })
            ) : ""
          );
        })
      )
    )
  );
}

function App() {
  var _React$useState9 = React.useState(false);

  var _React$useState10 = _slicedToArray(_React$useState9, 2);

  isMounted = _React$useState10[0];
  setMounted = _React$useState10[1];

  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: function onClick() {
          setMounted(function (prev) {
            return !prev;
          });
        } },
      "Toggle PostList"
    ),
    isMounted ? React.createElement(PostList, null) : "Nincs mountolva a PostList komponens..."
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));