import React, { createContext, useState, useEffect } from "react";

import Router from "./router";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Context

const defaultShowList = true;

interface ShowListComponent {
  showList: boolean;
  setShowList: (value: boolean) => void;
}

export const ShowListContext = createContext<ShowListComponent | undefined>(
  undefined
);

function App() {
  const [showList, setShowList] = useState(defaultShowList);

  useEffect(() => {
    const showListTemp = true;

    setShowList(showListTemp);
  }, []);

  return (
    <ShowListContext.Provider
      value={{ showList, setShowList }}
    >
      <Router />
    </ShowListContext.Provider>
  );
}

export default App;
