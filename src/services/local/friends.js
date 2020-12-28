import FcPouchDB from "../../database/pouchdb/index";

class FriendsDB extends FcPouchDB {
    constructor() {
        super('fc_users')
    }

    sync() {
        super.sync(
            'friends/only_mine'
        );
    }

    async getFriends() {
        try {
            const docs = await this.db.allDocs({
                include_docs: true,
                attachments: true
            })
            return docs.rows.map( row => ({
                firstName: row.doc.firstName,
                lastName: row.doc.lastName,
                picture: row.doc.picture,
                _id: row.doc._id,
            }))
        } catch(err) {
            console.log(err);
            return null
        }
    }
}

export default new FriendsDB();