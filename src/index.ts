import express, { Response, Request, Application } from 'express';

import bodyParser from 'body-parser';
import { STATUS_CODES } from 'http';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));


app.get('/', indexController);
app.post('/solve', problemController);

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
            
function indexController(req: Request, res: Response) {
    res.status(200).json('hello world');
}

function problemController(req: Request, res: Response) {
    let inputArray: number[] = req.body.input;
    if (inputArray.length != 9) {
        // send bad request
        return res.status(301).json('Input array should be of length 9');
    }
}