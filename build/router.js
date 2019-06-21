"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("./controller");
var router = express_1.Router();
exports.router = router;
router.get('/', controller_1.indexController);
router.get('/solve', controller_1.problemController);
