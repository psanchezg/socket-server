import { Socket } from "socket.io";

export const desconectar = ( cliente: Socket ) => {

    cliente.on( 'disconnect', () => {
        console.log( 'Cliente desconectado' );
    });

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on( 'mensaje', ( payload:{ de: string, cuerpo: string } ) => {
        
        console.log( 'Mensaje recibido' );
        console.log( payload );

        io.emit( 'mensaje-nuevo', payload );
        
    });


}