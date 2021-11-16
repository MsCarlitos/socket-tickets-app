const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.path = { }

        //middlewares de la aplicacion
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();

        //sockets
        this.sockets();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.path.auth,       require('../routes/auth.routes'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port} con socket io`);
        })
    }
}

module.exports = Server;