import { BehaviorSubject } from "rxjs"

export const authentication = (function() {
    const initialState = localStorage.getItem('token') ? true : false;
    const subject = new BehaviorSubject(initialState);

    return {
        value: subject.value,
        subscribe: callback => subject.subscribe(callback),
        authenticate: (authenticated) => subject.next(authenticated)
    }
})()

