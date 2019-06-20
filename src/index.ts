import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { router } from './router';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(router);

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});