import { batchPut, getDocsStartsWith } from './pouchdb';
import { FRIEND_DB_PREFIX, GROUP_DB_PREFIX, INVITATION_DB_PREFIX } from '../constants';

const setDocs = async function(docs, prefix) {
    if (!Array.isArray(docs)) return false;
    try {
        await batchPut(docs, prefix)
        return true;
    } catch(err) {
        console.log(err)
        return false;
    }
}

const getDocs = async function(prefix) {
    try {
        const friends = await getDocsStartsWith(prefix)
        return friends;
    } catch(err) {
        console.log(err)
        return null
    }
}

export const setFriendList = async function(list) {
    return setDocs(list, FRIEND_DB_PREFIX);
}

export const getFriendList = async function() {
    return getDocs(FRIEND_DB_PREFIX)
}

export const setGroupList = async function(list) {
    return setDocs(list, GROUP_DB_PREFIX);
}

export const getGroupList = async function() {
    return getDocs(GROUP_DB_PREFIX)
}

export const setInvitationList = async function(list) {
    return setDocs(list, INVITATION_DB_PREFIX);
}

export const getInvitationList = async function() {
    return getDocs(INVITATION_DB_PREFIX)
}