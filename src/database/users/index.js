import FcPouchDB from "../fcPouch";
import { syncInprocessUsers, syncUpdateUsers } from "../../store/db";

const usersDbName = process.env.REACT_APP_USERS_DB_NAME

class UsersDB extends FcPouchDB {
    constructor() {
        super(usersDbName)
    }

    sync() {
        super.sync(
            null,
            this.onNewChanges,
            this.onSyncPaused,
            this.onSyncActive,
            this.onSyncActive
        );
    }

    onNewChanges(info) {
        console.log(usersDbName, ':: New Changes', info);
        syncUpdateUsers.next(true);
    }

    onSyncError(error) {
        console.log(usersDbName, ':: Error', error);
    }

    onSyncPaused() {
        console.log(usersDbName, ':: Paused');
        syncInprocessUsers.next(false)
    }

    onSyncActive() {
        console.log(usersDbName, ':: Active');
        syncInprocessUsers.next(true);
    }
}

export default new UsersDB();