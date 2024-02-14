const { createStore } = require("redux");

const store = createStore((state = [], action) => {
  if (action.type == "add") {
    return [...state, action.data];
  }
  if (action.type == "del") {
    return state.filter((item) => item !== action.data);
  }
  return state;
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "add", data: "Apple" });
store.dispatch({ type: "add", data: "Banana" });
store.dispatch({ type: "add", data: "Cherry" });
store.dispatch({ type: "del", data: "Banana" });
