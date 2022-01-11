import { Router } from 'express';
import * as controller from './BookReserveController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/book-reserve';
const router = Router();

// route
router.get('/', checkNotUserRole, throwAsNext(controller.getAllBookReserve));
router.get('/:id', checkNotUserRole, throwAsNext(controller.getBookReserveById));
router.get('/:id/member', throwAsNext(controller.getBookReserveByUserId));
router.post('', throwAsNext(controller.requestBookReserve));
router.put('/:id', checkNotUserRole, throwAsNext(controller.updateBookReserve));
router.delete('/:id', requireAdminRole, throwAsNext(controller.deleteBookReserve));

// export
export default { path, router };
