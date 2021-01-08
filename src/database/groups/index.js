import FcPouchDB from "../fcPouch";
import { syncInprocessGroups, syncUpdateGroups } from "../../store/db";

const groupsDbName = process.env.REACT_APP_GROUPS_DB_NAME
const groupsServerFilter = 'groups/only_mine';

const groupsDesignDoc = {
    _id: "_design/groups",
    filters: {
        only_mine: String(
            function (doc, req) {
                return true;
            }
        )
    }
}

class GroupsDB extends FcPouchDB {
    constructor() {
        super(groupsDbName);

    }

    async sync() {
        try{
            await super.setLocalDesignDoc(groupsDesignDoc);
        }catch(err){
            console.log('err in sync',err);
        }
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