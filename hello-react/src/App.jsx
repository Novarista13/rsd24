/* eslint-disable react/prop-types */
import "./App.css";
import AddForm from "./components/AddForm";
import CheckList from "./components/CheckList";

const App = ({add, list, toggle, remove}) => {

  return (
    <div className="app">
        <AddForm add={add} />
        <CheckList
          list={list.filter((i) => !i.done)}
          toggle={toggle}
          remove={remove}
        />
        <CheckList
          list={list.filter((i) => i.done)}
          toggle={toggle}
          remove={remove}
          done={true}
        />
    </div>
  );
};

export default App;
