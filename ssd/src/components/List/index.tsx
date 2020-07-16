import React, { useState, useEffect, useContext } from "react";

import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Systems from "../../interface/Systems.interface";

import SystemsResponse from "../../interface/SystemsResponse.interface";
import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import api from "../../service/api";

const useShowList = () => useContext(ShowListContext);
const useIdSystem = () => useContext(EditSystemContext);

const List = () => {
  const [systems, setSystems] = useState<Systems[]>([]);

  const { setShowList } = useShowList()!;
  const { setIdSystem } = useIdSystem()!;

  useEffect(() => {
    handleDataFromAPI();
  }, []);

  const handleGetToken = (): string => {
    const token: string = window.localStorage.getItem("token") || "";

    return token;
  }

  const handleDataFromAPI = async () => {
    const token = handleGetToken();

    const systemsResponse = await api.get("/v1/products/authenticated", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (systemsResponse.status === 500) {
      alert("Servidor não está disponível. Volte mais tarde!");
      return;
    }

    if (systemsResponse.status === 401) {
      alert("Session expired. Volte mais tarde!");
      return;
    }

    const systemsTemp = [...systems];

    (systemsResponse.data as SystemsResponse[]).map(
      ({ id, descricao, sigla, email, url, status }: SystemsResponse) => {
        systemsTemp.push({
          id,
          description: descricao,
          initials: sigla,
          email,
          url,
          status,
        });
      }
    );

    setSystems(systemsTemp);
  };

  const handleDeleteSystem = async (idSystem: number) => {
    const token = handleGetToken();

    const systemResponse = await api.delete(`/v1/products/delete/${idSystem}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (systemResponse.status === 500) {
      alert("Servidor não está disponível. Volte mais tarde!");
      return;
    }

    if (systemResponse.status === 401) {
      alert("Session expired. Volte mais tarde!");
      return;
    }

    if (systemResponse.status === 404) {
      alert("Sistema não encontrado. Recarregue a página e tente novamente!");
      return;
    }

    const systemToDelete = systems.findIndex(
      (system) => system.id === idSystem
    );
    alert(`Sistema ${systems[systemToDelete].initials} removido com sucesso!`);

    const newSystems = systems.filter(
      (system, index) => index !== systemToDelete
    );

    setSystems(newSystems);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-9">
          <h1>Listagem de itens</h1>
        </div>
        <div className="col-3 d-flex align-content-center flex-wrap">
          <button
            type="button"
            className="btn btn-primary ml-auto"
            onClick={() => {
              setShowList(false);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <span>Novo Sistema</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Sigla</th>
                <th scope="col">Email de atendimento</th>
                <th scope="col">URL</th>
                <th scope="col">Status</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {systems.map((system) => (
                <tr key={system.id}>
                  <td>{system.description}</td>
                  <td>{system.initials}</td>
                  <td>{system.email}</td>
                  <td>{system.url}</td>
                  <td>
                    {system.status === undefined
                      ? ""
                      : system.status
                      ? "Ativo"
                      : "Cancelado"}
                  </td>
                  <td>
                    <div className="row">
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-info btn-block"
                          onClick={() => {
                            setIdSystem(system.id);
                            setShowList(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-danger btn-block"
                          onClick={() => {
                            handleDeleteSystem(system.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;
