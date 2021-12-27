import { Router } from 'express';
import * as controller from './BookController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/books';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllBook));
router.get('/:id', throwAsNext(controller.getBookById));
router.post('', throwAsNext(controller.createBook));
router.put('/:id', throwAsNext(controller.updateBook));
router.delete('/:id', throwAsNext(controller.deleteBook));

// export
export default { path, router };
