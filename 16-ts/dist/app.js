"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function networkPostLister() {
    // Másik kompatibilis részprogram működése
    // Az absztrakt recept szerinti konkrét megvalósítás
    return fetch("http://jsonplaceholder.typicode.com/posts").then((res) => res.json());
}
function mockPostLister() {
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
const controller = (lister) => {
    return function (limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // Egyik részprogram működése
            const posts = yield lister();
            const totalCount = posts.reduce((acc, post) => acc + post.title.length, 0);
            return {
                count: posts.length,
                posts: posts.slice(0, limit),
                totalCharacterCount: totalCount,
            };
        });
    };
};
window.onload = function () {
    const form = document.getElementById("strategy-selector-form");
    if (!form) {
        return;
    }
    form.onsubmit = function (e) {
        e.preventDefault();
        const selectedStrategy = e.target.elements.selectedStrategy.value;
        const limit = Number(e.target.elements.limit.value);
        // const strategyMap: [options: PostLister]  = {
        //   network: networkPostLister,
        //   mock: mockPostLister,
        // };
        const strategyMap = new Map([
            ["network", networkPostLister],
            ["mock", mockPostLister],
        ]);
        const strategy = strategyMap.get(selectedStrategy);
        if (!strategy) {
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
