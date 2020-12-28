import { Subject } from 'rxjs';
import { groups } from '../services/local';

export const groupsList = (function() {
    const subject = new Subject();

    const init = async () => {
        const groupsList = await groups.getGroups();
        console.log(groupsList)
        subject.next(groupsList || []);
    }

    groups.setOnNewChanges(init);

    return {
        getValue: () => subject.value || [],
        init,
        subscribe: callback => subject.subscribe(callback)
    }
})()
