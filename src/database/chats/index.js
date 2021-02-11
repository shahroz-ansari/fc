import FcPouchDB from "../fcPouch";
import { syncUpdateChats } from "../../store/db";

class ChatsDB extends FcPouchDB {
    constructor(id) {
        super(`chat_${id}`)
        this.groupId = id;
        this.sync();
    }

    sync() {
        const onNewChanges = this.onNewChanges.bind(this)
        const onSyncPaused = this.onSyncPaused.bind(this)
        const onSyncActive = this.onSyncActive.bind(this)
        const onSyncError = this.onSyncError.bind(this)
        super.sync(
            null,
            onNewChanges,
            onSyncPaused,
            onSyncActive,
            onSyncError
        );
    }

    onNewChanges(info) {
        console.log(this.dbName, ':: New Changess', info);

        syncUpdateChats.add(this.groupId);
    }

    onSyncError(error) {
        console.log(this.dbName, ':: Error', error);
    }

    onSyncPaused() {
        console.log(this.dbName, ':: Paused');
    }

    onSyncActive() {
        console.log(this.dbName, ':: Active');
    }
}

class GroupChats {
    constructor() {
        this.dbs = {};
    }

    groupsToSync(groups) {
        groups.forEach( id => {
            if (id.indexOf('_design') < 0 && !this.dbs[id]) {
                this.dbs[id] = new ChatsDB(id)
            } else {
                console.log(id, 'already in sync')
            }
        })
    }

    getDB(groupId) {
        return this.dbs[groupId].db;
    }
}

export default new GroupChats();