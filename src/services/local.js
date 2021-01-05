import { _groupsdb } from "../database"

export const _getGroups = async () => {
    try {
        const result = await _groupsdb.db.allDocs({
            include_docs: true,
            attachments: true
        })

        return result.rows.map( row => row.doc)
    } catch(error) {
        console.log(error);
        return null
    }
}