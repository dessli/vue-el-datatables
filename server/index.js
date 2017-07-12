const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'mock/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// filter
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// mock start
server.get('/home', (req, res) => {
  if (req.query.id === '1') {
    res.jsonp({name: 'randy'})
    return
  }
  res.jsonp({name: 'lee'})
})

server.post('/user', (req, res) => {
  console.log(req.body)
  res.jsonp({name: 'post'})
})
//mock end

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})