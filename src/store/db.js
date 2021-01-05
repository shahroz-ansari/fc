import { BehaviorSubject } from "rxjs";

export const syncInprocessGroups = (function() {
    const subject = new BehaviorSubject(false);
    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()

export const syncUpdateGroups = (function() {
    const subject = new BehaviorSubject(false);
    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()