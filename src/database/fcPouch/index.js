import PouchDB from 'pouchdb';

class FcPouchDB {
    constructor(dbName) {
        if (dbName) {
            this.dbName = dbName;
            this.init();
        } else {
            console.log('Set DB Name in .env')
        }
    }

    init() {
        this.db = new PouchDB('__local__'+this.dbName);
    }

    getRemote() {
        // get creads from localstorage
        const syncGateway = 'http://shahroz.site:5984';
        const username = '9eedd37897fcfb14233a708588dc06e2dedd7762'
        const password = 'd3df79c89f9fa11cb505c759bf6683981c28dadd'

        return new PouchDB(`${syncGateway}/${this.dbName}`, {
            auth: {
                username,
                password
            }
        })
    }

    sync(filter, change, paused, active, error) {

        // prevent multi sync subscription
        if (this.remote) {
            console.log(this.dbName, 'sync in process...')
            return;
        }

        this.remote = this.getRemote();

        this.db.sync(this.remote, {
            live: true,
            retry: true,
            filter
        })
        .on('change', change)
        .on('paused', paused)
        .on('active', active)
        .on('denied', error)
        .on('error', error)
        .on('complete', (info) => {
            console.log(this.dbName, 'complete', info);
            // handle complete
        });
    }
}

export default FcPouchDB