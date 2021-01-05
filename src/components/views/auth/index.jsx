import React from 'react';
import authStyle from './auth.module.css'
import LoginWithGoogle from '../../core/loginWithGoogle';

function AuthenticationView() {

    return (
        <div className={authStyle.container}>
            <div className={authStyle.logoSection}>
                <span className={authStyle.logo}>Fc</span>
            </div>
            <div className={authStyle.authButtonSection}>
                <LoginWithGoogle />
            </div>
        </div>
    )
}

export default AuthenticationView