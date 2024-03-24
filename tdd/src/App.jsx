import { useRef, useState } from "react";
import "./App.css";
import { toCelsius } from "../utils/converter";

function App() {
  const [result, setResult] = useState();
  const inputRef = useRef();
  return (
    <div>
      <div role="title">running test</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = inputRef.current.value;
          setResult(toCelsius(f));
        }}
      >
        <input type="text" role="input" ref={inputRef} />
        <button role="button">convert</button>
      </form>
      {result && <div role="result">{result}</div>}
    </div>
  );
}

export default App;
