const express = require('express')
const app = express()
const port = 8080

app.use((req, res, next) => {
  const authheader = req.headers.authorization
  if (!authheader) {
    res.setHeader('WWW-Authenticate', 'Basic')
    const err = new Error('Vc precisa se autenticar!')
    err.status = 401
    return next(err)
  }

  // Basic blablabla64
  const [_Basic, encode] = authheader.split(' ')
  const [username, password] = new Buffer.from(encode,'base64').toString().split(':')

  console.dir({
    username,
    password
  })

  if (username == 'admin' && password == 'admin') {
    // OK usuário autenticado
    next()
  } else {
    res.setHeader('WWW-Authenticate', 'Basic')
    const err = new Error('Usuário ou senha errados')
    err.status = 401
    return next(err)
  }
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})