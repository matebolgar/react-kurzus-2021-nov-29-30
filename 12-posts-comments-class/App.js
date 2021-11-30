var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Könyvtárak telepítése: npm i
// Babel indítása: npm run dev

// Kommentek: https://jsonplaceholder.typicode.com/comments
// Posztok: https://jsonplaceholder.typicode.com/posts

var PostList = function (_React$Component) {
  _inherits(PostList, _React$Component);

  function PostList(props) {
    _classCallCheck(this, PostList);

    var _this = _possibleConstructorReturn(this, (PostList.__proto__ || Object.getPrototypeOf(PostList)).call(this, props));

    _this.state = {
      pendingId: "",
      comments: [],
      posts: [],
      selectedPostId: ""
    };

    console.log(props);
    return _this;
  }

  //   React.useEffect(() => {
  //   if (!selectedPostId) {
  //     return;
  //   }

  //   setComments([]);
  //   fetch("https://jsonplaceholder.typicode.com/comments?postId=" + selectedPostId)
  //     .then((res) => res.json())
  //     .then((comments) => {
  //       setComments(comments);
  //     });
  // }, [selectedPostId]);

  // const [posts, setPosts] = React.useState([]);

  _createClass(PostList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log("Unmount");
    }

    //   React.useEffect(() => {
    // }, [selectedPostId]);

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(elozoProps, elozoState) {
      var _this2 = this;

      console.log("előző state", elozoState);
      if (elozoState.selectedPostId !== this.state.selectedPostId) {
        this.setState({ comments: [] });
        fetch("https://jsonplaceholder.typicode.com/comments?postId=" + this.state.selectedPostId).then(function (res) {
          return res.json();
        }).then(function (comments) {
          _this2.setState({ comments: comments });
        });
      }
    }

    // Ha a dependency array az üres tömb, akkor az effect csak mountolódáskor fut
    // React.useEffect(() => {
    // }, []);

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      fetch("https://jsonplaceholder.typicode.com/posts").then(function (res) {
        return res.json();
      }).then(function (posts) {
        //setPosts(posts);
        _this3.setState({ posts: posts });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          null,
          React.createElement(
            "ul",
            null,
            this.state.posts.map(function (post) {
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
                      _this4.setState({ selectedPostId: post.id });
                    },
                    className: "btn btn-primary"
                  },
                  "Kommentek mutat\xE1sa"
                ),
                post.id === _this4.state.selectedPostId ? React.createElement(
                  "ul",
                  null,
                  _this4.state.comments.map(function (comment) {
                    return React.createElement(
                      "li",
                      { key: comment.id, className: "list-group-item" },
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
  }]);

  return PostList;
}(React.Component);

function App() {
  var _React$useState = React.useState(false);

  var _React$useState2 = _slicedToArray(_React$useState, 2);

  isMounted = _React$useState2[0];
  setMounted = _React$useState2[1];

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
      "Toggle postList"
    ),
    isMounted ? React.createElement(PostList, null) : "Nincs mountolva a PostList komponens..."
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById("app-container"));