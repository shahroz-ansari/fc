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
        this.db = new PouchDB('__local__' + this.dbName);
    }

    async setLocalDesignDoc(designDoc) {
        if (!this.db) return;
        if (!designDoc._id) return;
        try{
            const localDesignDoc = await this.db.get(designDoc._id);
            if (localDesignDoc) {
                designDoc._rev = localDesignDoc._rev;
            }
        }catch(err){
            console.error('error getting local design doc',err);
        }
        
        await this.db.put(designDoc);

    }

    getRemote() {
        // get creads from localstorage
        const syncGateway = 'http://localhost:5984';
        const username = 'd7a6f2c6e43181752a1fd2c45285eceb0f8d89ab'
        const password = 'fbffac655c9c50c3447080c0219657b12b1335fa'

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