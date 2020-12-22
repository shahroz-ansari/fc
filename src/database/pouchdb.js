import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find'
import { v4 } from 'uuid';

PouchDB.plugin(PouchDBFind);

const localFcDb = new PouchDB(process.env.REACT_APP_LOCAL_FC_DB);

// store multiple docs at a time adding prefix
export const batchPut = function(docs, prefix) {
    return new Promise((resolve, reject) => {
        docs = docs.map(doc => {
            // adding custom prefix
            doc._id = `${prefix}:${doc._id || v4()}`
            return doc
        });
        localFcDb.bulkDocs(docs)
            .then(() => resolve())
            .catch((err) => reject(err))
    })
}

// return list of docs whose id starts with passed prefix
export const getDocsStartsWith = function(prefix) {
    return new Promise((resolve, reject) => {
        localFcDb.find({
            selector: {
                _id: { $regex: new RegExp(`^${prefix}:`)}
            }
        })
        .then((result) => {
            const docs = result.docs.filter(doc => {
                // removing pouch revision
                delete doc._rev
                // removing custom added prefix
                doc._id = doc._id.substring(prefix.length + 1)
                return doc;
            })
            resolve(docs);
        })
        .catch((err) => reject(err))
    })
}

export default localFcDb;