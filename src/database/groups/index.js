import FcPouchDB from "../fcPouch";
import { syncInprocessGroups, syncUpdateGroups } from "../../store/db";

const groupsDbName = process.env.REACT_APP_GROUPS_DB_NAME
const groupsServerFilter = 'groups/only_mine'

class GroupsDB extends FcPouchDB {
    constructor() {
        super(groupsDbName)
    }

    sync() {
        super.sync(
            groupsServerFilter,
            this.onNewChanges,
            this.onSyncPaused,
            this.onSyncActive,
            this.onSyncActive
        );
    }

    onNewChanges(info) {
        console.log(groupsDbName, ':: New Changes', info);
        syncUpdateGroups.next(true);
    }

    onSyncError(error) {
        console.log(groupsDbName, ':: Error', error);
    }

    onSyncPaused() {
        console.log(groupsDbName, ':: Paused');
        syncInprocessGroups.next(false)
    }

    onSyncActive() {
        console.log(groupsDbName, ':: Active');
        syncInprocessGroups.next(true);
    }
}

export default new GroupsDB();