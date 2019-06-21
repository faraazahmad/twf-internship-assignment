"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problem_1 = require("./problem");
var util_1 = require("util");
function indexController(req, res) {
    res.status(200).json('hello world');
}
exports.indexController = indexController;
function problemController(req, res) {
    var inputArray = [];
    var inputArrayString = req.body.input;
    // refactor following code to make it better
    try {
        inputArray = inputArrayString
            .substring(1, inputArrayString.length - 1)
            .split(', ')
            .map(Number);
        if (inputArray.length != 9) {
            return res.status(400).json('Input array should be of length 9');
        }
        for (var i = 0; i < 9; i++) {
            if (inputArray[i] == NaN) {
                return res.status(400).json('Invalid input array');
            }
        }
    }
    catch (error) {
        return res.status(400).json(error);
    }
    var result = problem_1.getSolution(inputArray);
    if (util_1.isError(result)) {
        return res.status(500).json(result.message);
    }
    return res.status(200).json(result);
}
exports.problemController = problemController;
