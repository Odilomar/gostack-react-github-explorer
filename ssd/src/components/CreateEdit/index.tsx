import React, { useContext, useState, useEffect } from "react";

import SystemsResponse from "../../interface/SystemsResponse.interface";
import { EditSystemContext } from "../../context/EditSystemContext";
import { ShowListContext } from "../../context/ShowListContext";
import Systems from "../../interface/Systems.interface";
import api from "../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

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

  const { setShowList } = useShowList()!;
  const { idSystem, setIdSystem } = useEditSystem()!;

  const options: SelectOptions[] = [
    { value: "", label: "Sem status" },
    { value: "true", label: "Ativo" },
    { value: "false", label: "Cancelado" },
  ];

  useEffect(() => {
    handleSystemGetById();
  });

  const handleResetPage = () => {
    setIdSystem(0);
    setShowList(true);
  };

  const handleSystemGetById = async () => {
    if (idSystem === 0) return;

    const token = handleGetToken();

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

  const handleGetToken = (): string => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      handleResetPage();
    }

    return token || "";
  };

  const handleCreateOrEditSystem = async () => {
    const token = handleGetToken();

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      return;
    }

    alert(userMessage);
    setShowList(true);
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
                <div className="form-row mt-3">
                  <div className="col">
                    <input
                      type="text"
                      id="initials"
                      className="form-control"
                      placeholder="Siglas"
                      defaultValue={
                        idSystem > 0 && system ? system.initials : ""
                      }
                      maxLength={10}
                      onChange={(initials) => {
                        let systemTemp = system;
                        systemTemp.initials = initials.target.value;
                        setSystem(system);
                      }}
                      required
                    />
                  </div>

                  <label htmlFor="initials" className="text-danger ml-2">
                    *
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-row mt-3">
                  <div className="col">
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

                  <label htmlFor="email" className="text-danger ml-2">
                    *
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-row mt-3">
                  <div className="col">
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

                  <label htmlFor="url" className="text-danger ml-2">
                    *
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-row mt-3">
                  <div className="col">
                    <select
                      className="form-control"
                      id="status"
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

                  <label htmlFor="status" className="text-danger ml-2">
                    *
                  </label>
                </div>
              </div>
            </div>
            <div className="form-row mt-3">
              <div className="col">
                <textarea
                  id="description"
                  rows={3}
                  className="form-control"
                  placeholder="Descrição"
                  defaultValue={
                    idSystem > 0 && system ? system.description : ""
                  }
                  maxLength={100}
                  onChange={(description) => {
                    let systemTemp = system;
                    systemTemp.description = description.target.value;
                    setSystem(systemTemp);
                  }}
                  required
                />
              </div>

              <label htmlFor="description" className="text-danger ml-2">
                *
              </label>
            </div>
            <div className="form-group mt-3">
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
                <div className="col-6 d-flex align-content-center flex-wrap">
                  <button className="btn btn-success ml-auto">
                    <FontAwesomeIcon icon={faSave} />
                    <span className='ml-2'>Salvar</span>
                  </button>
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
