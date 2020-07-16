import React, { useContext, useState, useEffect } from "react";

import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import CreateEdit from "../../components/CreateEdit";
import List from "../../components/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const defaultEditSystem = 0;

const useShowList = () => useContext(ShowListContext);

const Dashboard = () => {
  const [idSystem, setIdSystem] = useState(defaultEditSystem);
  const history = useHistory();

  const { showList } = useShowList()!;

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token === undefined || token === "" || token === null)
      history.push("/");

    const idSystemTemp = 0;
    setIdSystem(idSystemTemp);
  }, []);

  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col">
          <h1>Dashboard</h1>
        </div>
        <div className="col-2 d-flex align-content-center flex-wrap">
          <button
            type="button"
            className="btn btn-primary ml-auto"
            onClick={handleSignOut}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="ml-2">Sair</span>
          </button>
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
