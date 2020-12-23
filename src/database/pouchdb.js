import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind);

const localFcDb = new PouchDB(process.env.REACT_APP_LOCAL_FC_DB, {
    revs_limit: 1
});

export const put = function(doc) {
    return new Promise((resolve, reject) => {
        localFcDb.put(doc)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
}

export const get = function(identifier) {
    return new Promise((resolve, reject) => {
        localFcDb.get(identifier)
        .then((doc) => resolve(doc))
        .catch((err) => reject(err))
    })
}

export default localFcDb;