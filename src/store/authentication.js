import { BehaviorSubject } from "rxjs";
import { getAuthToken } from "../utils/ls";

export const authentication = (function() {
    const initialState = getAuthToken() ? true : false;
    const subject = new BehaviorSubject(initialState);

    // auto login after 5 sec
    setTimeout(() => {
        subject.next(true)
    }, 5000)

    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()