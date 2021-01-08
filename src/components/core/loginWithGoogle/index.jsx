import { GoogleLogin } from 'react-google-login';

export default function LoginWithGoogle(props) {

    const onSuccessLogin = function(googleUser) {
        const id_token = googleUser.getAuthResponse().id_token;
        props.successCallback(id_token);
    }

    const onFailureLogin = function(err) {
        props.failureCallback();
    }

    return <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Login With Google"
    onSuccess={onSuccessLogin}
    onFailure={onFailureLogin}
    cookiePolicy={'single_host_origin'}
  />
}