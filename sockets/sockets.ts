import { Socket } from "socket.io";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import socketIO from 'socket.io';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar( usuario );
    // io.emit( 'usuarios-activos', usuariosConectados.getLista() );

}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'disconnect', () => {
        console.log( 'Cliente desconectado' );
        usuariosConectados.borarUsuario( cliente.id );
        
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );
    });

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on( 'mensaje', ( payload:{ de: string, cuerpo: string } ) => {
        
        console.log( 'Mensaje recibido', payload );

        io.emit( 'mensaje-nuevo', payload );
        
    });


}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on( 'config-user', ( payload:{ name: string }, callback: Function ) => {
        
        usuariosConectados.actualizarNombre( cliente.id, payload.name );
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        
    });

}

// Obtener usuarios
export const obtenerUsuarios = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on( 'get-users', () => {
        
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );
        
    });

}