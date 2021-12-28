import { Router } from 'express';
import * as controller from './LibraryCardController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/libraryCard';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllLibraryCard));
router.get('/:id', throwAsNext(controller.getLibraryCardById));
router.post('', throwAsNext(controller.createLibraryCard));
router.put('/:id', throwAsNext(controller.updateLibraryCard));
router.delete('/:id', throwAsNext(controller.deleteLibraryCard));

// export
export default { path, router };
