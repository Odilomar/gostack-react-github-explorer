import React, { useState, useEffect, useContext } from "react";

import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Systems from "../../interface/Systems.interface";

import SystemsResponse from "../../interface/SystemsResponse.interface";
import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import api from "../../service/api";

const useShowList = () => useContext(ShowListContext);
const useIdSystem = () => useContext(EditSystemContext);

const List = () => {
  const [token, setToken] = useState("");
  const [systems, setSystems] = useState<Systems[]>([]);

  const { setShowList } = useShowList()!;
  const { setIdSystem } = useIdSystem()!;

  useEffect(() => {
    const tempToken: string = window.localStorage.getItem("token") || "";

    setToken(tempToken);
  }, []);

  useEffect(() => {
    handleDataFromAPI();
  }, [token]);

  const handleDataFromAPI = async () => {
    if (token === "") return;

    const systemsResponse = await api.get("/v1/products/authenticated", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (systemsResponse.status === 500) {
      alert("Servidor não está disponível. Volte mais tarde!");
    }

    if (systemsResponse.status === 401) {
      alert("Session expired. Volte mais tarde!");
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

  return (
    <>
      <div className="row mt-4">
        <div className="col-10">
          <h1>Listagem de itens</h1>
        </div>
        <div className="col-1 ml-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setShowList(false);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Descrição</th>
                <th scope="col">Sigla</th>
                <th scope="col">Email de atendimento</th>
                <th scope="col">URL</th>
                <th scope="col">Status</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {systems.map((system, index) => (
                <tr key={system.id}>
                  <th scope="row">{index + 1}</th>
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
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        setIdSystem(system.id);
                        setShowList(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
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
