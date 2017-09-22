import Resources from './resources'

export const getUserList = async (offset, limit, search) => await Resources('http://127.0.0.1:7001/api/member', 'get', {offset, limit, search})
