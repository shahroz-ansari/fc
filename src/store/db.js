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

export const syncInprocessUsers = (function() {
    const subject = new BehaviorSubject(false);
    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()

export const syncUpdateUsers = (function() {
    const subject = new BehaviorSubject(false);
    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()

export const syncUpdateChats = (function() {
    const subject = new BehaviorSubject([]);
    return {
        value: subject.value,
        add: (groupId) => {
            const _value = [...subject.value];
            if (_value.indexOf(groupId) < 0) {
                _value.push(groupId)
            }
            return subject.next(_value)
        },
        remove: (groupId) => {
            const _value = [...subject.value];
            const index = _value.indexOf(groupId)
            if (index > -1) {
                _value.splice(index, 1)
            }
            return subject.next(_value)
        },
        subscribe: callback => subject.subscribe(callback)
    }
})()