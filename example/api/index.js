import Resources from './resources'

export const getUserList = async (offset, limit, search, order, refreshTotal) => await Resources('/user/list', 'search', {type: 'get-list', offset, limit, search: JSON.stringify(search), order: JSON.stringify(order), refreshTotal})
