import PouchDB from 'pouchdb';

class FcPouchDB {
    constructor(dbName) {
        this.dbName = dbName;
        this.init();
    }

    init() {
        this.setLocalDB();
        this.setRemoteDB();
    }

    setOnNewChanges(onNewChanges) {
        this.onNewChanges = onNewChanges
    }

    setLocalDB() {
        this.db = new PouchDB('__local__'+this.dbName);
    }

    setRemoteDB() {
        // get creads from localstorage

        const syncGateway = 'http://shahroz.site:5984';
        const username = 'userB'
        const password = 'userBpass'

        this.remote = new PouchDB(`${syncGateway}/${this.dbName}`, {
            auth: {
                username,
                password
            }
        })
    }

    sync(filter) {
        if(!this.remote || !this.db) return;
        this.remote.replicate.to(this.db, {
            live: true,
            retry: true,
            filter
        }).on('change', (info) => {
            this.onNewChanges && this.onNewChanges();
        }).on('paused', (err) => {
            console.log(this.dbName, 'paused', err);
            // replication paused (e.g. replication up to date, user went offline)
        }).on('active', () => {
            console.log(this.dbName, 'active');
            // replicate resumed (e.g. new changes replicating, user went back online)
        }).on('denied', (err) => {
            console.log(this.dbName, 'Error', err);
        }).on('complete', (info) => {
            console.log(this.dbName, 'complete', info);
            // handle complete
        }).on('error', (err) => {
            console.log(this.dbName, 'Error', err);
        });
    }
}

export default FcPouchDB