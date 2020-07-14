import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import api from "../../service/api";

interface Systems {
  id: number;
  description: string;
  initials: string;
  email: string;
  url: string;
  status?: boolean;
}

interface SystemsResponse {
  id: number;
  descricao: string;
  sigla: string;
  email: string;
  url: string;
  status?: boolean;
}

const List = () => {
  const [token, setToken] = useState("");
  const [systems, setSystems] = useState<Systems[]>([]);
  
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

    systemsResponse.data.map(
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

    console.log(systemsResponse);
  };

  return (
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
              <Link to={`/edit/${system.id}`} className="btn btn-info">
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
