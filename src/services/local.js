import { _groupsdb } from "../database"
import { v4 } from "uuid";

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

export const _createGroup = async (title, picture = null) => {
    try {
        // @TODO get user id from store or local storage
        const result = await _groupsdb.db.put({
            _id: v4(),
            _attachments: {
                picture: {
                    content_type: picture.type,
                    data: picture
                }
            },
            adminId: '9eedd37897fcfb14233a708588dc06e2dedd7762',
            title,
            users: ['9eedd37897fcfb14233a708588dc06e2dedd7762'],
        })

        return result
    } catch(error) {
        console.log(error)
        return null
    }
}