import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const GenerateSystem = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>
                        Editar Sistemas
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form action="">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" id="initials" className="form-control" placeholder="Siglas" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" id="email" className="form-control" placeholder="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">

                                <div className="form-group">
                                    <input type="text" id="url" className="form-control" placeholder="Url" />
                                </div>
                            </div>
                            <div className="col-6">

                                <div className="form-group">
                                    <input type="text" id="status" className="form-control" placeholder="Status" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea id="description" rows={5} className="form-control" placeholder="Description" />
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/dashboard" className="btn btn-danger">
                                        Cancelar
                                    </Link>
                                </div>
                                <div className="col-6 ml-auto">
                                    <button className="btn btn-primary">
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenerateSystem;