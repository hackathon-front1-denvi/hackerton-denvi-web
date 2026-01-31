const { createServer } = require('https')
const { parse } = require('url')
const fs = require('fs')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('192.168.50.245-key.pem'),
  cert: fs.readFileSync('192.168.50.245.pem'),
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, '0.0.0.0', err => {
    if (err) throw err
    console.log('> Server running at https://localhost:3000')
  })
})
