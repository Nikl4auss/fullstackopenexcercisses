import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "ZERO":
      return 0;

    default:
      return state;
  }
};

const store = createStore(counterReducer);

function App() {
  return (
    <div className="App">
      <h1>{store.getState()}</h1>
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        increment
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        decrement
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
export default App;
