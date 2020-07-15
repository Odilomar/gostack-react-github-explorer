import React, { useState, useEffect } from "react";

import Router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ShowListContext } from "./context/ShowListContext";

const defaultShowList = true;

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
