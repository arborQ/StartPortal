import express from 'express';
import api from './routes';
import bodyParser from 'body-parser';
import config from './config';

const app = express();

app.use(bodyParser.json());
app.use('/api', api);

app.listen(config.PORT, () => {
    console.log(`Listening on: http://localhost:${config.PORT}`);
});