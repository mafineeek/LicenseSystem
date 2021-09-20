import { Router, Request, Response } from 'express';
const router = Router();

import keys from './keys';

router.use('/keys', keys)

router.get('*', (req: Request, res: Response) => {
    res.status(404).json({
        message: '404: Not Found',
        code: 0,
    });
});

export default router;