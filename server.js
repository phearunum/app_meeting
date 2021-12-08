const { on } = require('events')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('client', { roomId: req.params.room })
});
app.get('/group/:room', (req, res) => {
  socket.on('join-room', (roomId, userId) => {
    console.log(userId)
  })
    res.redirect(`/${uuidV4()}`)
  })

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    
  socket.on('join-room', (roomId, userId) => {
    console.log(userId)
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
    console.log(userId)
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
      console.log('deconnected')
    })
  })
})

server.listen(3000)