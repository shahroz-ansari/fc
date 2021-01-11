import { _groupsdb } from "../database"
import { v4 } from "uuid";
import { getFcData } from "../utils/ls";

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