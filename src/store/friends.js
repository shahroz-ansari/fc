import { Subject } from 'rxjs';
import { friends } from '../services/local';

export const friendsList = (function() {
    const subject = new Subject();

    const init = async () => {
        const friendList = await friends.getFriends();
        console.log(friendList)
        subject.next(friendList || []);
    }

    friends.setOnNewChanges(init);

    return {
        getValue: () => subject.value || [],
        init,
        subscribe: callback => subject.subscribe(callback)
    }
})()
