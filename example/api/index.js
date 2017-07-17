import Resources from './resources'

export const getUserList = async () => await Resources('/user/list', 'search', {})
