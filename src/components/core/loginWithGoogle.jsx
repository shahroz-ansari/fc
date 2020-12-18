import { GoogleLogin } from 'react-google-login';

export default function LoginWithGoogle() {

    const onSuccessLogin = function(data) {
        console.log(data);
    }

    const onFailureLogin = function(err) {
        console.log(err)
    }

    return <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Login With Google"
    onSuccess={onSuccessLogin}
    onFailure={onFailureLogin}
    cookiePolicy={'single_host_origin'}
  />
}