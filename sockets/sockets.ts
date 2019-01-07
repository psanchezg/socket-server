import { Socket } from "socket.io";
import { callbackify } from "util";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket ) => {

    cliente.on( 'disconnect', () => {
        console.log( 'Cliente desconectado' );
        usuariosConectados.borarUsuario( cliente.id );
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

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        
    });

}