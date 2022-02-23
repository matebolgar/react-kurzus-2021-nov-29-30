// Az érték-objektumok típus leírása
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Result = {
  count: number;
  posts: Post[];
  totalCharacterCount: number;
};

// A függvények típus leírása (Működés absztrakt receptje)
type PostLister = () => Promise<Post[]>;

function networkPostLister(): Promise<Post[]> {
  // Másik kompatibilis részprogram működése
  // Az absztrakt recept szerinti konkrét megvalósítás
  return fetch("http://jsonplaceholder.typicode.com/posts").then((res) => res.json());
}

function mockPostLister(): Promise<Post[]> {
  // Másik kompatibilis részprogram működése
  // Az absztrakt recept szerinti konkrét megvalósítás
  return Promise.resolve([
    {
      userId: 1,
      id: 1,
      title: "teszt1",
      body: "body1",
    },
    {
      userId: 2,
      id: 2,
      title: "teszt2",
      body: "body2",
    },
  ]);
}

type PostListController = (lister: PostLister) => (limit: number) => Promise<Result>;

const controller: PostListController = (lister: PostLister) => {
  return async function (limit) {
    // Egyik részprogram működése
    const posts = await lister();
    const totalCount = posts.reduce((acc, post: Post) => acc + post.title.length, 0);

    return {
      count: posts.length,
      posts: posts.slice(0, limit),
      totalCharacterCount: totalCount,
    };
  };
};

window.onload = function () {
  const form = document.getElementById("strategy-selector-form");
  if (!form) {
    return;
  }
  form.onsubmit = function (e: any) {
    e.preventDefault();
    const selectedStrategy: string = e.target.elements.selectedStrategy.value;
    const limit = Number(e.target.elements.limit.value);

    // const strategyMap: [options: PostLister]  = {
    //   network: networkPostLister,
    //   mock: mockPostLister,
    // };

    const strategyMap = new Map<string, PostLister>([
      ["network", networkPostLister],
      ["mock", mockPostLister],
    ]);

    
    const strategy = strategyMap.get(selectedStrategy);
    if(!strategy) {
      return;
    }

    controller(strategy)(limit).then((result) => {
      console.log(result);
    });
  };
};

controller(networkPostLister)(5).then((result) => {
  console.log(result);
});

controller(mockPostLister)(1).then((result) => {
  console.log(result);
});
