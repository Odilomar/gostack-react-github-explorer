import React, { useContext, useState, useEffect } from "react";

import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import CreateEdit from "../../components/CreateEdit";
import List from "../../components/List";

const defaultEditSystem = 0;

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
        <div className="col align-self-center">
          <EditSystemContext.Provider value={{ idSystem, setIdSystem }}>
            {showList ? <List /> : <CreateEdit />}
          </EditSystemContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
