import { useState } from 'react';
import { toastError } from "../../../helpers/ToastError";
import { useNavigate } from 'react-router-dom';
import axios from '../../../lib/axios';
import '../styles.css';
import UseUser from '../../../hooks/useUser';

function FormSignUp() {
    const { setShowLogin, setShowSignUp } = UseUser();

    const toggleSignUpAndLogin = (showSignUp) => {
        setShowSignUp(showSignUp);
        setShowLogin(!showSignUp);
    };


    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password || !confirmarSenha) {
            toastError("Preencha todos os campos");
            return;
        }
        if (password.length < 5) {
            toastError('A a senha precisa ter 6+ caracteres.');
            return;
        }
        if (password !== confirmarSenha) {
            toastError('As senhas digitadas não coincidem.');
            return;
        }
        try {
            const userData = {
                name,
                email,
                password,
            };

            const teste = await axios.post("/users/check-email/", {
                name,
                email,
            });

            if (teste.data.canRegister === false) {
                toastError("Email já registrado");
            } else {

                const response = await axios.post('/new-user', userData);

                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('userName', response.data.user.name);
                localStorage.setItem('userEmail', response.data.user.email);
                localStorage.setItem('token', response.data.token);

                if (response.status === 201 || response.status === 200) {
                    navigate('/home');
                }

            }


        } catch (error) {
            toastError('Não foi possível cadastrar o usuário. Por favor, tente novamente mais tarde.');


            console.log(error);
        }
    };
    return (
        <div className="form-box">
            <h1 >Cadastre-se</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(event) => setNome(event.target.value)}
                />

                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <label htmlFor="confirmarSenha">Confirme a senha:</label>
                <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Digite novamente sua senha"
                    value={confirmarSenha}
                    onChange={(event) => setConfirmarSenha(event.target.value)}
                />

                <button type='submit'> Cadastrar</button>


            </form>

            <a href='#Login' onClick={() => toggleSignUpAndLogin(false)}>
                Já tem conta? Clique aqui para fazer o login
            </a>



        </div >
    );
}

export default FormSignUp;
