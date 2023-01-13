import express from 'express'
import cartsRoutes from './routes/cartsRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io'

const app = express();
const httpServer = app.listen(8080, () => console.log("Server OK! Listening PORT 8080"))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api/products/', productsRoutes)
app.use('/api/carts/', cartsRoutes)
app.use('/', viewsRoutes)
app.use(express.static(__dirname + '/public'))

socketServer.on('connection', socket=>{
    console.log("new client connected")
    app.set('socket', socket)
    socket.on('message', data =>{
        console.log(data)
    })
})
