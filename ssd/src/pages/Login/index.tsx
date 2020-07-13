import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
    name: string;
    role: string;
}

interface SelectOption {
    value: string;
    label: string;
}

const Login = () => {

    const [user, setUser] = useState<User>({
        name: '',
        role: '',
    });

    const options: SelectOption[] = [
        { value: "tecnico", label: "Técnico" },
        { value: "super", label: "Super Usuário" },
        { value: "admin", label: "Administrador do Sistema" },
    ];

    const history = useHistory();

    const handleInputChange = (inputName: ChangeEvent<HTMLInputElement>) => {
        const { value } = inputName.target;

        updateUser(value, user.role);
    }

    const handleSelectChange = (inputSelect: ChangeEvent<HTMLSelectElement>) => {
        const { value } = inputSelect.target;

        updateUser(user.name, value);
    }

    const updateUser = (name: string, role: string) => {
        setUser({ name, role });
    }

    const signIn = async () => {

        if (user.name === '' || user.role === '') {
            alert("Dados inválidos. Corrija os dados e Tente novamente!");
            return;
        }

        const data = { "Nome": user.name, "Role": user.role };

        const loginResponse = await axios.post('https://localhost:44307/v1/account/login', data);

        if (loginResponse.status === 404) {
            alert("Usuário não encontrado. Verifique seus dados e tente novamente!");
            return;
        }

        if (loginResponse.status === 500) {
            alert("Problemas com o servidor. Tente novamente mais tarde!");
            return;
        }

        const { token } = loginResponse.data;

        window.localStorage.setItem("token", token);

        history.push('/dashboard');
    }

    return (
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-7">
                    <h1 className="text-center">Sistema de Segurança Digital</h1>
                    <form className="mt-4">
                        <div className='form-group'>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                className="form-control"
                                onChange={handleInputChange}
                                placeholder="Informe seu nome"
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="role">Setor</label>
                            <select name="" id="role" className="form-control" onChange={handleSelectChange}>
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick={signIn}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;