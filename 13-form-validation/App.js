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
    fetch("http://jsonplaceholder.typicode.com/comments?postId=" + selectedPostId).then(function (res) {
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
    fetch("http://jsonplaceholder.typicode.com/posts").then(function (res) {
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

  var _React$useState9 = React.useState(""),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      title = _React$useState10[0],
      setTitle = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      isTitleError = _React$useState12[0],
      setTitleError = _React$useState12[1];

  var _React$useState13 = React.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      isInvalidCharacterError = _React$useState14[0],
      setInvalidCharacterError = _React$useState14[1];

  React.useEffect(function () {
    setTitleError(title.length > 10);
  }, [title]);

  // (string, Array<string>) -> bool
  function containsInvalidChar(str, blacklist) {
    return str.split("").some(function (char) {
      return blacklist.includes(char);
    });
  }

  React.useEffect(function () {
    var characterBlackList = ["<", ">", "&", "@"];
    setInvalidCharacterError(containsInvalidChar(title, characterBlackList));
  }, [title]);

  var _React$useState15 = React.useState(""),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      body = _React$useState16[0],
      setBody = _React$useState16[1];

  React.useEffect(function () {
    console.log(body);
  }, [body]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "\xDAj poszt"
      ),
      React.createElement(
        "form",
        { className: "card m-3" },
        React.createElement("input", {
          className: "form-control m-2 " + (isTitleError || isInvalidCharacterError ? "border border-danger" : ""),
          type: "text",
          name: "title",
          placeholder: "C\xEDm",
          onChange: function onChange(e) {
            setTitle(e.target.value);
          },
          value: title
        }),
        isTitleError ? React.createElement(
          "p",
          { className: "text-danger" },
          "Hiba! C\xEDm hosszabb mint 10 karakter..."
        ) : "",
        isInvalidCharacterError ? React.createElement(
          "p",
          { className: "text-danger" },
          "Invalid karakter..."
        ) : "",
        React.createElement("textarea", {
          className: "form-control m-2",
          type: "text",
          name: "body",
          placeholder: "Tartalom",
          value: body,
          onChange: function onChange(e) {
            setBody(e.target.value);
          }
        }),
        React.createElement(
          "button",
          { className: "btn btn-success" },
          "K\xFCld\xE9s"
        )
      ),
      React.createElement(
        "ul",
        null,
        posts.map(function (post) {
          return React.createElement(ListItem, {
            key: post.id,
            post: post,
            comments: selectedPostId === "" ? [] : comments,
            setSelectedPostId: setSelectedPostId,
            selectedPostId: selectedPostId
          });
        })
      ),
      "Footer"
    )
  );
}

function ListItem(props) {
  var post = props.post,
      comments = props.comments,
      setSelectedPostId = props.setSelectedPostId,
      selectedPostId = props.selectedPostId;


  return React.createElement(
    "li",
    { className: "list-group-item" },
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
          { key: comment.id, className: "list-group-item" },
          comment.body
        );
      })
    ) : ""
  );
}

ReactDOM.render(React.createElement(PostList, null), document.getElementById("app-container"));