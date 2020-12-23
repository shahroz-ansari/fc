
import { FRIEND_DB_IDENTIFIER, GROUP_DB_IDENTIFIER, INVITATION_DB_IDENTIFIER } from '../constants';
import { put, get } from './pouchdb';

const dumpData = async function(data, identifier) {
    let doc;
    try {
        doc = await get(identifier);
    }   finally {
        if (doc) {
            doc.data = data;
        } else {
            doc = {
                _id: identifier,
                data
            }
        }
        try {
            await put(doc);
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }
    }
}

const getDumpData = async function(identifier) {
    try {
        const doc = await get(identifier);
        return doc;
    } catch(err) {
        console.log(err)
        return null
    }
}

export const setFriendList = async function(data) {
    return dumpData(data, FRIEND_DB_IDENTIFIER);
}

export const getFriendList = async function() {
    return getDumpData(FRIEND_DB_IDENTIFIER)
}

export const setGroupList = async function(data) {
    return dumpData(data, GROUP_DB_IDENTIFIER);
}

export const getGroupList = async function() {
    return getDumpData(GROUP_DB_IDENTIFIER)
}

export const setInvitationList = async function(data) {
    return dumpData(data, INVITATION_DB_IDENTIFIER);
}

export const getInvitationList = async function() {
    return getDumpData(INVITATION_DB_IDENTIFIER)
}