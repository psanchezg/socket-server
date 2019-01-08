import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Todo está bien'
    });

});

router.post('/mensajes', ( req: Request, res: Response ) => {

    const cuerpo    = req.body.cuerpo;
    const user      = req.body.usuario;
    const payload   = {
        cuerpo,
        de: user
    };
    const server = Server.instance;

    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        mensaje: 'POST: Todo está bien',
        cuerpo: cuerpo,
        user: user
    });

});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const cuerpo    = req.body.cuerpo;
    const user      = req.body.usuario;
    const id        = req.params.id;

    const payload   = {
        cuerpo,
        de: user
    };

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        user,
        id
    });

});

// Obtener ids de usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( ( err: any, clientes: string[] ) => {
        if( err ) {
            res.json({
                ok: false,
                err
            });
            return;
        }
        res.json({
            ok: true,
            clientes
        });
    
    });
    
});



// Obtener usuarios y nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
    
});


export default router;