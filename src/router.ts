import { Router } from 'express';
import { problemController, indexController } from './controller';

let router = Router();
router.get('/', indexController);
router.get('/solve', problemController);

export { router };