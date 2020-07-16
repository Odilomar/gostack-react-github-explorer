import React, { useContext, useState, useEffect } from "react";

import SystemsResponse from "../../interface/SystemsResponse.interface";
import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import Systems from "../../interface/Systems.interface";
import api from "../../service/api";
import { useHistory } from "react-router-dom";

interface SelectOptions {
  value: string;
  label: string;
}

const useShowList = () => useContext(ShowListContext);
const useEditSystem = () => useContext(EditSystemContext);

const CreateEdit = () => {
  const [system, setSystem] = useState<Systems>({
    description: "",
    email: "",
    id: 0,
    initials: "",
    url: "",
  });
  const [token, setToken] = useState("");

  const { setShowList } = useShowList()!;
  const { idSystem, setIdSystem } = useEditSystem()!;

  const history = useHistory();

  const options: SelectOptions[] = [
    { value: "", label: "Sem status" },
    { value: "true", label: "Ativo" },
    { value: "false", label: "Cancelado" },
  ];

  useEffect(() => {
    if (idSystem === 0) return;

    const token = window.localStorage.getItem("token");

    if (!token) {
      handleResetPage();
      return;
    }

    setToken(token);
  }, []);

  useEffect(() => {
    handleSystemGetById();
  }, [token]);

  const handleResetPage = () => {
    setIdSystem(0);
    setShowList(true);
  };

  const handleSystemGetById = async () => {
    if (token === undefined || token === "") return;

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
    };

    setSystem(system);
  };

  const handleCreateOrEditSystem = async () => {
    if (token === undefined || token === "") history.push("/");

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik9kaWxvbWFyIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNTk0OTA5MDc1LCJleHAiOjE1OTQ5MTI2NzUsImlhdCI6MTU5NDkwOTA3NX0.NqARtYgoKAoqa8r_zYkFNDsrWKjhPdeRiE-RYemuLFc`,
      },
    };

    const systemUpdate: SystemsResponse = {
      descricao: system.description,
      email: system.email,
      id: system.id,
      sigla: system.initials,
      url: system.url,
      status: system.status,
    };

    const systemResponse =
      system.id === 0
        ? await api.post("/v1/products/admin", systemUpdate, header)
        : await api.put(
            `/v1/products/updating/${system.id}`,
            systemUpdate,
            header
          );

    const userMessage =
      system.id === 0
        ? "Sistema cadastrado com sucesso!"
        : "Sistema atualizado com sucesso!";

    if (systemResponse.status === 400) {
      alert("Verifique os seus dados e tente novamente");
      // return;
    }

    alert(userMessage);
    // setShowList(true);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          {idSystem > 0 ? <h1>Editar Sistemas</h1> : <h1>Criar Sistemas</h1>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form
            action=""
            onSubmit={(form) => {
              form.preventDefault();
              handleCreateOrEditSystem();
            }}
          >
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="initials"
                    className="form-control"
                    placeholder="Siglas"
                    defaultValue={idSystem > 0 && system ? system.initials : ""}
                    maxLength={10}
                    onChange={(initials) => {
                      console.log(initials.target.value, system);
                      let systemTemp = system;
                      systemTemp.initials = initials.target.value;
                      setSystem(system);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    defaultValue={idSystem > 0 && system ? system.email : ""}
                    maxLength={100}
                    onChange={(email) => {
                      let systemTemp = system;
                      systemTemp.email = email.target.value;
                      setSystem(systemTemp);
                    }}
                    required
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
                    defaultValue={idSystem > 0 && system ? system.url : ""}
                    maxLength={50}
                    onChange={(url) => {
                      let systemTemp = system;
                      systemTemp.url = url.target.value;
                      setSystem(systemTemp);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <select
                    className="form-control"
                    defaultValue={
                      system.id === 0 || system.status === undefined
                        ? ""
                        : `${system.status}`
                    }
                    onChange={(status) => {
                      const statusOption = status.target.value;
                      let systemTemp = system;

                      systemTemp.status =
                        statusOption === "true"
                          ? true
                          : statusOption === "false"
                          ? false
                          : undefined;
                      setSystem(systemTemp);
                    }}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                id="description"
                rows={5}
                className="form-control"
                placeholder="Descrição"
                defaultValue={idSystem > 0 && system ? system.description : ""}
                maxLength={100}
                onChange={(description) => {
                  let systemTemp = system;
                  systemTemp.description = description.target.value;
                  setSystem(systemTemp);
                }}
                required
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
    </>
  );
};

export default CreateEdit;
