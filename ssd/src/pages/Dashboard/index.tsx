import React, { useContext, createContext, useState, useEffect } from "react";

import List from "../../components/List";
import { ShowListContext } from "../../App";
import CreateEdit from "../../components/CreateEdit";

interface EditSystem {
  idSystem: number;
  setIdSystem: (value: number) => void;
}

const defaultEditSystem = 0;

export const EditSystemContext = createContext<EditSystem | undefined>(undefined);
const useShowList = () => useContext(ShowListContext);

const Dashboard = () => {
  const [idSystem, setIdSystem] = useState(defaultEditSystem);

  const { showList } = useShowList()!;

  useEffect(() => {
    const idSystemTemp = 0;
    setIdSystem(idSystemTemp);
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3">Search Component</div>
        <div className="col align-self-center">
          {/* {window.switchComponents.showList ? <List /> : <CreateEdit />} */}
          <EditSystemContext.Provider value={{ idSystem, setIdSystem }}>
            {showList ? <List /> : <CreateEdit />}
          </EditSystemContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
