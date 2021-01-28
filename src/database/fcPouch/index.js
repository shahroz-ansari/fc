import PouchDB from 'pouchdb';
import {getFcData} from '../../utils/ls'

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
        const FcData = getFcData();
        if(!FcData) return null;
        const {syncGatewayProtocol,syncGatewayHost,syncGatewayPort,syncGatewayUser,syncGatewayPass} = FcData;
        const syncGateway = `${syncGatewayProtocol}://${syncGatewayHost}:${syncGatewayPort}`;

        return new PouchDB(`${syncGateway}/${this.dbName}`, {
            auth: {
                username:syncGatewayUser,
                password:syncGatewayPass
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
        if(!this.remote){
            console.error('Error in getting remote credentials');
            return;
        }

        this.db.replicate.to(this.remote, {
            live: true,
            retry: true
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

        const replicateOptions = {
            live: true,
            retry: true
        }

        if (filter) { replicateOptions.filter = filter };

        this.db.replicate.from(this.remote, replicateOptions)
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