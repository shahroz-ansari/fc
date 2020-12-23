import { Subject } from 'rxjs';
import { getFriendList } from '../database';

export const friendsList = (function() {
    const subject = new Subject();

    return {
        getValue: () => subject.value || [],
        init: async () => {
            const friendList = await getFriendList();
            subject.next(friendList.data || []);
        },
        subscribe: callback => subject.subscribe(callback),
        addNewFriend: async (id) => {
            
        }
    }
})()