import { Router } from 'express';
import * as controller from './AuthorController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/authors';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllAuthors));
router.get('/:id', throwAsNext(controller.getAuthorById));
router.post('', throwAsNext(controller.createAuthor));
router.put('/:id', throwAsNext(controller.updateAuthor));
router.delete('/:id', throwAsNext(controller.deleteAuthor));

// export
export default { path, router };
