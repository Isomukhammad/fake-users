import { JSX } from "react";

import Header from "./components/Header.tsx";
import List from "./components/List.tsx";

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <List />
    </>
  );
};

export default App;
