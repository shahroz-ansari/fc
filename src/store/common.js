import { BehaviorSubject } from "rxjs"
import { handleGoogleAuth } from '../services';
import {getAuthToken,setAuthToken} from '../utils';

export const authentication = (function() {
    const initialState = getAuthToken() ? true : false;
    const subject = new BehaviorSubject(initialState);
    const authenticate = (authenticated) => subject.next(authenticated)

    return {
        value: subject.value,
        subscribe: callback => subject.subscribe(callback),
        authenticate: authenticate,
        authenticateGoogleToken: (idToken) => {
            handleGoogleAuth(idToken).then(authToken =>{
                authenticate(true);
                setAuthToken(authToken);
            }).catch(err=>{
                console.error('error in authentication',err);
                authenticate(false);

                // call logout method
            })
        }
    }
})()

