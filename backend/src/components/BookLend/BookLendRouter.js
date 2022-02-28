import { Router } from 'express';
import * as controller from './BookLendController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/book-lend';
const router = Router();

// route
router.get('/', checkNotUserRole, throwAsNext(controller.getAllBookLend));
router.get('/:id', checkNotUserRole, throwAsNext(controller.getBookLendById));
router.get('/:id/member', throwAsNext(controller.getBookLendByUserId));
router.post('', throwAsNext(controller.createBookLend));
router.put('/:id', checkNotUserRole, throwAsNext(controller.updateBookLend));
router.delete('/:id', requireAdminRole, throwAsNext(controller.deleteBookLend));

// export
export default { path, router };
