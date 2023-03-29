import express from 'express';
import bookController from './../controllers/bookController.js';
import verifyIsAdmin from '../services/middlewares/verifyIsAdmin.js';
const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/', verifyIsAdmin, bookController.createBook);
router.put('/:id', verifyIsAdmin, bookController.updateBook);
router.delete('/:id', verifyIsAdmin, bookController.deleteBook);

export default router;