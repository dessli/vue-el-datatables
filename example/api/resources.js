import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  next()
})

let customActions = {
  search: {method: 'POST'}
}

export default async (path, action, data = {}) => {
  let res
  try {
    switch (action) {
      case 'get':
        res = await Vue.resource(path).get(data)
        break
      case 'save':
        res = await Vue.resource(path).save(data)
        break
      case 'query':
        res = await Vue.resource(path).query(data)
        break
      case 'update':
        res = await Vue.resource(path).update(data)
        break
      case 'remove':
        res = await Vue.resource(path).remove(data)
        break
      case 'delete':
        res = await Vue.resource(path).delete(data)
        break
      case 'search':
        res = await Vue.resource(path, {}, customActions).search(data)
        break
      default:
        break
    }
    if (res.status === 200) {
      return res.data
    } else {
      return {errcode: -1, errmsg: 'Api error' + res.status, httpStatus: res.status}
    }
  } catch (e) {
    if (e) {
      if (e.status === 500) {
        return {errcode: -2, errmsg: 'Api error(500)'}
      }
    }
    return {errcode: -2, errmsg: 'Api error(-2)' + typeof e + JSON.stringify(e)}
  }
}

