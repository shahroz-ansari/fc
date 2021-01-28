import { _groupsdb, _chatDb } from "../database"
import { v4 } from "uuid";
import { getFcData } from "../utils/ls";

export const _getGroups = async () => {
    try {
        const result = await _groupsdb.db.allDocs({
            include_docs: true,
            attachments: true
        })

        return result.rows.map( row => row.doc )
    } catch(error) {
        console.log(error);
        return null
    }
}

export const _getGroupIds = async () => {
    try {
        const result = await _groupsdb.db.allDocs();
        return result.rows.map( row => row.id )
    } catch(error) {
        console.log(error)
        return null
    }
}

export const _getGroup = async (id) => {
    try {
        const result = await _groupsdb.db.get(id)

        return result
    } catch(error) {
        console.log(error);
        return null
    }
}

export const _createGroup = async (title, picture = null) => {
    try {
        const FcData = getFcData();
        if(!FcData) return null;
        const { syncGatewayUser } = FcData;
        
        const result = await _groupsdb.db.put({
            _id: v4(),
            _attachments: {
                picture: {
                    content_type: picture.type,
                    data: picture
                }
            },
            adminId: syncGatewayUser,
            title,
            users: [syncGatewayUser],
        })

        return result
    } catch(error) {
        console.log(error)
        return null
    }
}

export const _getGroupChats = async (groupId) => {
    try {
        const result = await _chatDb.getDB(groupId).allDocs({
            include_docs: true,
            attachments: true
        })

        return result.rows.map( row => row.doc )
    } catch(error) {
        console.log(error);
        return null
    }
}