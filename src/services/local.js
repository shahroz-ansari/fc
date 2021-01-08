import { _groupsdb } from "../database"
import { v4 } from "uuid";

export const _getGroups = async () => {
    try {
        const result = await _groupsdb.db.allDocs({
            include_docs: true,
            attachments: true
        })

        return result.rows.map( row => row.doc).filter(row=>{
            if(!row._id || row._id.includes('_design')) return false;
            return true;
        })
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
            adminId: 'd7a6f2c6e43181752a1fd2c45285eceb0f8d89ab',
            title,
            users: ['d7a6f2c6e43181752a1fd2c45285eceb0f8d89ab'],
        })

        return result
    } catch(error) {
        console.log(error)
        return null
    }
}