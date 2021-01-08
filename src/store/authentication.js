import { BehaviorSubject } from "rxjs";
import { getAuthToken } from "../utils/ls";

export const authentication = (function() {
    const initialState = getAuthToken() ? true : false;
    const subject = new BehaviorSubject(initialState);

    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()