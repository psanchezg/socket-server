import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSocket();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSocket() {

        console.log( 'Escuchando conexiones - sockets' );

        this.io.on( 'connection', cliente => {
            console.log( 'cliente conectado', cliente.id );

            // Conectar cliente
            socket.conectarCliente( cliente, this.io );

            // Conectar cliente
            socket.obtenerUsuarios( cliente, this.io );

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente, this.io );

            // Mensaje
            socket.mensaje( cliente, this.io );

            
        });
    }

    start( callback: Function ) {

        this.httpServer.listen ( this.port, callback );

    }
}