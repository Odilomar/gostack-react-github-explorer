import React from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import List from "../../components/List";

const Dashboard = () => {

    // const history = useHistory();

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-10">
                    <h1>
                        Dashboard
                    </h1>
                </div>
                <div className="col-1 ml-auto">
                    <button type='button' className='btn btn-primary'>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col align-self-center">
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;