import React from 'react';
import './styles.css'
import UseUser from '../../../hooks/useUser';

function LogoBar() {
    const { setShowLogin, setShowSignUp } = UseUser();

    const toggleSignUpAndLogin = () => {
        setShowSignUp(false);
        setShowLogin(false);
    };


    return (
        <div className='logo-bar'>

            <span onClick={() => toggleSignUpAndLogin()}>
                Vivendo
                <span style={{ color: 'red' }}>de</span>
                Sushi
            </span>



        </div>

    )
}

export default LogoBar;
