import React, { useContext, useState, useEffect } from "react";

import Systems from "../../interface/Systems.interface";
import { ShowListContext } from "../../App";
import { EditSystemContext } from "../../pages/Dashboard";
import api from "../../service/api";
import { SystemsResponse } from "../List";

interface CreateEditProps {
  user?: Systems;
}

// Create Context
const useShowList = () => useContext(ShowListContext);
const useEditSystem = () => useContext(EditSystemContext);

const CreateEdit = ({ user }: CreateEditProps) => {
  const [system, setSystem] = useState<Systems>();

  // Create Context State
  const { showList, setShowList } = useShowList()!;
  const { idSystem, setIdSystem } = useEditSystem()!;

  useEffect(() => {
    console.log(`Edit: ${idSystem}`);

    if (idSystem === 0) return;

    const token = window.localStorage.getItem("token");

    if (!token) {
      handleResetPage();
      return;
    }

    handleSystemGetById(token);
  }, []);

  const handleResetPage = () => {
    setIdSystem(0);
    setShowList(true);
  };

  const handleSystemGetById = async (token: string) => {
    const systemResponse = await api.get(`/v1/products/${idSystem}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (systemResponse.status === 404) {
      alert("Sistema não encontrado. Tente novamente!");
      handleResetPage();
    }

    if (systemResponse.status === 404) {
      alert("Sistema não encontrado. Tente novamente!");
      handleResetPage();
    }

    if (systemResponse.status === 500) {
      alert("Servidor Offline. Tente novamente mais tarde!");
      handleResetPage();
    }

    const systemResponseTemp = systemResponse.data as SystemsResponse;

    const system: Systems = {
      initials: systemResponseTemp.sigla,
      description: systemResponseTemp.descricao,
      email: systemResponseTemp.email,
      id: systemResponseTemp.id,
      url: systemResponseTemp.url,
      status: systemResponseTemp.status,
    }

    setSystem(system);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {idSystem > 0 ? <h1>Editar Sistemas</h1> : <h1>Criar Sistemas</h1>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form action="">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="initials"
                    className="form-control"
                    placeholder="Siglas"
                    value={idSystem > 0 && system ? system.initials : ""}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={idSystem > 0 && system ? system.email : ""}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="url"
                    className="form-control"
                    placeholder="Url"
                    value={idSystem > 0 && system ? system.url : ""}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="status"
                    className="form-control"
                    placeholder="Status"
                    value={
                      ""
                      // idSystem === 0 || system.status === undefined || system
                      //   ? " "
                      //   : system.status
                      //   ? "Ativo"
                      //   : "Cancelado"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                id="description"
                rows={5}
                className="form-control"
                placeholder="Description"
                value={idSystem > 0 && system ? system.description : ""}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowList(true);
                      setIdSystem(0);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col-6 ml-auto">
                  <button className="btn btn-primary">Salvar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEdit;
