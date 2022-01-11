import { Router } from 'express';
import * as controller from './LibraryCardController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/library-card';
const router = Router();

// route
router.get('/', checkNotUserRole, throwAsNext(controller.getAllLibraryCard));
router.get('/:id', checkNotUserRole, throwAsNext(controller.getLibraryCardById));
router.get('/:id/member', throwAsNext(controller.getLibraryCardByUserId));
router.post('', throwAsNext(controller.createLibraryCard));
router.put('/:id', checkNotUserRole, throwAsNext(controller.updateLibraryCard));
router.delete('/:id', requireAdminRole, throwAsNext(controller.deleteLibraryCard));

// export
export default { path, router };
