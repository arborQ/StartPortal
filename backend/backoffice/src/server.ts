import express from 'express';
import api from './routes';
import bodyParser from 'body-parser';
import config from './config';
import { connectToDatabase } from './repositories'
const app = express();

app.use(bodyParser.json());
app.use('/api', api);

console.log('Connect to database!')
connectToDatabase().then(() => {
    console.log('Database connected!')
});

app.listen(config.PORT, () => {
    console.log(`Listening on: http://localhost:${config.PORT}`);
});
