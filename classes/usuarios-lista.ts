import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {

    }

    public agregar( usaurio: Usuario ) {
        this.lista.push( usaurio );
        console.log( this.lista );
        return Usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {

        for ( let usuario of this.lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log( '======== Actualziando usuario ========')
        console.log( this.lista );
    }

    public getLista() {
        return this.lista;
    }

    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id );
    }

    public getUsuariosEnSala( sala: string ) {
        return this.lista.filter( usuario => usuario.sala === sala );
    }

    public borarUsuario( id: string ) {

        const tempUser = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log( 'Salio el usuario', tempUser.nombre );
        console.log( this.lista );
        return tempUser;
    }

}