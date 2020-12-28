import FcPouchDB from "../../database/pouchdb/index";

class GroupsDB extends FcPouchDB {
    constructor() {
        super('fc_groups')
    }

    sync() {
        super.sync(
            'groups/only_mine'
        );
    }

    async getGroups() {
        try {
            const docs = await this.db.allDocs({
                include_docs: true,
                attachments: true
            })
            return docs.rows.map( row => ({
                title: row.doc.title,
                picture: row.doc.picture,
                _id: row.doc._id,
            }))
        } catch(err) {
            console.log(err);
            return null
        }
    }
}

export default new GroupsDB();