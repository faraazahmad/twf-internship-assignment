import express, { Response, Request, Application } from 'express';
import bodyParser from 'body-parser';

import { getSolution } from './problem';
import { isError } from 'util';

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
    let inputArray: number[] = [];
    let inputArrayString: string = req.body.input;
    
    inputArrayString.substring(1, inputArrayString.length - 1)
    .split(', ')
    .map((char) => {
        inputArray.push(Number(char));
    });

    if (inputArray.length != 9) {
        // send bad request
        return res.status(301).json('Input array should be of length 9');
    }

    let result: number | Error = getSolution(inputArray);
    if (isError(result)) {
        return res.status(500).json(result.message);
    }

    return res.status(200).json(result);
}