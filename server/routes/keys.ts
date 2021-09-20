import { Router, Request, Response } from 'express';
import { AUTHKEY } from '../config'
import db from 'quick.db';
import { v4 as uuidv4 } from 'uuid';
const router = Router();

router.post('/', (req: Request, res: Response) => {

    /* Kod jest niepoprawny, zwrócmy odpowiedz w JSON */

    if (!req.headers['authorization'] || !req.headers['authorization'] as unknown !== AUTHKEY)
        return res.status(403).json({
            code: 403,
            error: 'Niepoprawny kod autoryzacji żądania.'
        })

    /* Utwórzmy klucz */

    const uuidCode = uuidv4();

    db.set(`keys.${uuidCode}`, {
        active: true,
        timestamp: Date.now()
    })

    /* Po utworzeniu klucza, prześlijmy je w opdowiedzi */

    return res.status(200).json({
        code: 200,
        key: uuidCode
    })

})

router.get('/:id', (req: Request, res: Response) => {

    /* Kod jest niepoprawny, zwrócmy odpowiedz w JSON */

    if (!req.headers['authorization'] || !req.headers['authorization'] as unknown !== AUTHKEY)
        return res.status(403).json({
            code: 403,
            error: 'Niepoprawny kod autoryzacji żądania.'
        })

    /* Nie przesłany został klucz, zwróć odpowiedz klientowi */
    
    if(!req.params.id) return res.status(403).json({
        code: 403,
        error: 'Nie przesłano klucza w parametrach żądania.'
    })
        
    /* Czy dany klucz istnieje? */

    if (db.get(`keys.${req.params.id}.active`)) return res.status(200).json({
        code: 200,
        success: true
    })
    else return res.status(200).json({
        code: 200,
        success: false
    });

});

export default router;