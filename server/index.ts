import express from 'express';
import { PORT } from './config';
import Routes from './routes';

const app = express();
app.set('port', PORT || 8089);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Wczytujemy nasze endpointy interfejsu */

app.use('/', Routes)

app.listen(app.get('port'), () => console.log('[MLSystem] Server started'));
