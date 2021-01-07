import React, { useEffect } from 'react';
import authStyle from './auth.module.css'
import LoginWithGoogle from '../../core/loginWithGoogle';
import { handleGoogleAuth } from '../../../services/server';
import { setAuthToken, setFcData, clearLocalStorage } from '../../../utils/ls';
import { authentication } from '../../../store/authentication';


function AuthenticationView() {

    //handling autoLogin in dev mode
    useEffect(() => {
        const { REACT_APP_MODE, REACT_APP_AUTO_LOGIN, REACT_APP_SYNCGATEWAY_USER, REACT_APP_SYNCGATEWAY_PASS, REACT_APP_SYNCGATEWAY_PROTOCOL, REACT_APP_SYNCGATEWAY_HOST, REACT_APP_SYNCGATEWAY_PORT, REACT_APP_authToken } = process.env;
        if (REACT_APP_MODE === 'development' && REACT_APP_AUTO_LOGIN === 'yes') {
            const data = {
                syncGatewayUser: REACT_APP_SYNCGATEWAY_USER,
                syncGatewayPass: REACT_APP_SYNCGATEWAY_PASS,
                syncGatewayProtocol: REACT_APP_SYNCGATEWAY_PROTOCOL,
                syncGatewayHost: REACT_APP_SYNCGATEWAY_HOST,
                syncGatewayPort: REACT_APP_SYNCGATEWAY_PORT
            }
            setAuthToken(REACT_APP_authToken);
            setFcData(data);
            authentication.next(true);
        }
    }, []);



    const googleSuccessCallback = (idToken) => {
        handleGoogleAuth(idToken).then(data => {
            // setting local storage value
            setAuthToken(data.token);
            setFcData(data);

            //updating authentication store value
            authentication.next(true);

        }).catch(err => {
            console.error('error in handlegoogle auth', err);
            // logout 
            logout();
        })
    }

    const logout = () => {
        console.log('logout');
        // clear local store values
        clearLocalStorage();
        // setting store authentication value to false
        authentication.next(false);
    }



    return (
        <div className={authStyle.container}>
            <div className={authStyle.logoSection}>
                <span className={authStyle.logo}>Fc</span>
            </div>
            <div className={authStyle.authButtonSection}>
                <LoginWithGoogle successCallback={googleSuccessCallback} failureCallback={logout} />
            </div>
        </div>
    )
}

export default AuthenticationView