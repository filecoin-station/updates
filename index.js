import http from 'node:http'
import timers from 'node:timers/promises'

const { PORT = 3000 } = process.env

const handler = async (req, res) => {
  await timers.setTimeout(10_000)
  res.setHeader('cache-control', 'public, max-age=31536000, immutable')
  res.end('ok')
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url} ...`)
  handler(req, res)
    .catch(err => {
      console.error(err)
      res.statusCode = 500
      res.end('Oh no')
    })
    .then(() => {
      console.log(`${req.method} ${req.url} ${res.statusCode}`)
    })
})

server.listen(PORT)
console.log(`http://localhost:${PORT}`)
