import { JSX, useReducer } from "react";

import Header from "./components/Header.tsx";
import List from "./components/List.tsx";
import { fakerInitialState, fakerReducer } from "./reducer.ts";

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(fakerReducer, fakerInitialState);

  return (
    <div className={"bg-neutral-300"}>
      <Header state={state} dispatch={dispatch} />
      <List state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;
