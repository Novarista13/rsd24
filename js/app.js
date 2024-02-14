// call back arrow function

const fn = () => () => console.log("Done");
fn()();

// array functions

const users = [
  { id: 1, name: "alice", age: 23 },
  { id: 2, name: "bob", age: 20 },
  { id: 3, name: "caesa", age: 22 },
  { id: 4, name: "dane", age: 21 },
  { id: 5, name: "elsa", age: 24 },
];

const result = [...users, { id: 6, name: "felia", age: 19 }];

console.log(result.map((user) => user.name));

console.log(result.filter((user) => user.age >= 20));

console.log(result.filter((user) => user.age >= 20).map((user) => user.name));

// Promise

function a() {
  console.log("function a");
}

function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("function b");
      resolve();
    }, 2000);
  });
}

function c() {
  console.log("function c");
}

a();
b().then(c);

// async await

async function app() {
  a();
  await b();
  c();
}
app();
