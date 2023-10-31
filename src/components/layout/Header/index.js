import React, { useState } from 'react';
import './styles.css'
// import { useContext, useEffect } from 'react';
// import axios from '../../../lib/axios'
// import Context from '../../../context/Context';


const Header = () => {
    const user = {
        name: 'Gabriel'
    }
    const [miniModalOpen, setMiniModalOpen] = useState(false);

    const handleMiniModalToggle = () => {
        setMiniModalOpen(!miniModalOpen);
    };
    // const { user, setUser } = useContext(Context);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get('/');
    //             setUser(response.data.name);
    //             setUser('Gabriel');

    //         } catch (error) {
    //             console.error('Erro ao obter os dados do usuário:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, [setUser]);
    return (
        <div className="header-container">
            <div className="title"><h1>Curso - Meu Primeiro Site</h1></div>

            {user && (
                <div className="user-info flex-center">
                    <div className="user-avatar">
                        <div className="user-avatar-circle">
                            {user.name.slice(0, 2).toUpperCase()}
                        </div>
                    </div>
                    <div className="user-name">{user.name}</div>
                    <div className="arrow-icon" onClick={handleMiniModalToggle}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.94914 9.79289C6.33967 9.40237 6.97283 9.40237 7.36336 9.79289L12.6562 15.0858L17.9491 9.79289C18.3397 9.40237 18.9728 9.40237 19.3634 9.79289C19.7539 10.1834 19.7539 10.8166 19.3634 11.2071L13.3634 17.2071C12.9728 17.5976 12.3397 17.5976 11.9491 17.2071L5.94914 11.2071C5.55862 10.8166 5.55862 10.1834 5.94914 9.79289Z" fill="#0E8750" />
                        </svg>


                    </div>
                    {miniModalOpen && (
                        <div className="mini-modal">
                            <div className="edit-icon flex-center-column">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" fill="none">
                                    <g clip-path="url(#clip0_85184_779)">
                                        <path d="M0.75 15.2501L5 14.2501L14.2929 4.9572C14.6834 4.56667 14.6834 3.93351 14.2929 3.54298L12.4571 1.7072C12.0666 1.31667 11.4334 1.31667 11.0429 1.7072L1.75 11.0001L0.75 15.2501Z" stroke="#747488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.25 15.25H9.75" stroke="#747488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_85184_779">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Editar</p>
                            </div>
                            <div className="exit-icon flex-center-column">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <path d="M15.75 8.75L19.25 12L15.75 15.25" stroke="#747488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19 12H10.75" stroke="#747488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25" stroke="#747488" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>Sair</p>
                            </div>
                        </div>
                    )}
                </div>

            )}


        </div>
    );
};

export default Header;
