import React, { useEffect } from 'react';
import '../styles.css';
import { toastError } from "../../../helpers/ToastError";
import axios from '../../../lib/axios';
import { useNavigate } from 'react-router-dom';
import UseUser from '../../../hooks/useUser';



function FormLogin() {
    const { email, setEmail, password, setPassword, setShowLogin, setShowSignUp } = UseUser()


    const toggleSignUpAndLogin = (showSignUp) => {
        setShowSignUp(showSignUp);
        setShowLogin(!showSignUp);
    };


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
    async function handleLogin() {
        if (!email || !password) {
            toastError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('/login', { email, password });

            if (response.status === 200) {
                navigate('/home');
            }

            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('token', response.data.token);

        } catch (error) {
            toastError('Erro ao fazer login. Confira se os dados estao corretos.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home');
        }
    })

    return (
        <div className='form-box'>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Digite seu E-mail'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor='password'>Senha:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Digite sua password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />


                <button type='submit' onClick={handleLogin}>
                    Entrar
                </button>



                <a href='#Cadastro' onClick={() => toggleSignUpAndLogin(true)}>
                    Ainda não tem conta? Clique aqui!
                </a>


            </form>
        </div >





    );
}

export default FormLogin;
