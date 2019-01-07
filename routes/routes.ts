import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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
        user
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

export default router;