import groupsdb from './groups'
import chatDb from './chats'

export const _groupsdb = groupsdb
export const _chatDb = chatDb

const defaultExport = { _groupsdb: groupsdb, _chatDb: chatDb }  
export default defaultExport