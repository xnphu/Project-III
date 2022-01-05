import { Router } from 'express';
import * as controller from './BookController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/books';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllBook));
router.get('/:id', throwAsNext(controller.getBookById));
router.post('', checkNotUserRole, throwAsNext(controller.createBook));
router.put('/:id', checkNotUserRole, throwAsNext(controller.updateBook));
router.delete('/:id', checkNotUserRole, throwAsNext(controller.deleteBook));
router.post('/search',throwAsNext(controller.searchBook));

// export
export default { path, router };
