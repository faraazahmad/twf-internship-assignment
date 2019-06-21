import { Request, Response } from 'express';
import { getSolution } from './problem';
import { isError } from 'util';

export function indexController(req: Request, res: Response) {
    return res.status(200).json('hello world');
}

export function problemController(req: Request, res: Response) {
    let inputArray: number[] = [];
    let inputArrayString: string = req.body.input;

    // refactor following code to make it better
    try {
        inputArray = inputArrayString
            .substring(1, inputArrayString.length - 1)
            .split(', ')
            .map(Number);

        if (inputArray.length != 9) {
            return res.status(400).json('Input array should be of length 9');
        }

        for (let i = 0; i < 9; i++) {
            if (inputArray[i] == NaN) {
                return res.status(400).json('Invalid input array');
            }
        }
    } catch (error) {
        return res.status(400).json(error);
    }    

    let result: number | Error = getSolution(inputArray);
    if (isError(result)) {
        return res.status(500).json(result.message);
    }

    return res.status(200).json(result);
}