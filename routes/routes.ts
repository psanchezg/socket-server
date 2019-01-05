import { Router, Request, Response } from 'express';

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

    res.json({
        ok: true,
        mensaje: 'POST: Todo está bien',
        cuerpo: cuerpo,
        user: user,
        id: id
    });

});

export default router;