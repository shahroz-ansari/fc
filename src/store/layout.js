import { BehaviorSubject } from "rxjs";

export const tabsState = (function() {
    const initialState = {
        show: true,
        active: 'groups'
    }
    const subject = new BehaviorSubject(initialState);

    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()

export const headerState = (function() {
    const initialState = {
        logo: true,
        goBack: false,
        icon: '',
        text: 'Fc',
        subText: '',
    }
    const subject = new BehaviorSubject(initialState);

    return {
        value: subject.value,
        next: (value) => subject.next(value),
        subscribe: callback => subject.subscribe(callback)
    }
})()