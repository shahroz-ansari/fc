import groupsdb from './groups'
import chatDb from './chats'
import usersDb from './users'

export const _groupsdb = groupsdb
export const _chatDb = chatDb
export const _usersDb = usersDb

const defaultExport = { _groupsdb: groupsdb, _chatDb: chatDb, _usersDb: usersDb }  
export default defaultExport