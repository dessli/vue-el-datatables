import Resources from './resources'

export const getUserList = async (offset, limit, search, order) => await Resources('http://127.0.0.1:7001/api/member', 'get', {type: 'get-list', offset, limit, search: JSON.stringify(search), order: JSON.stringify(order)})
