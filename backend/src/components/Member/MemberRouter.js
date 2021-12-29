import { Router } from 'express';
import * as controller from './MemberController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/members';
const router = Router();

// route
router.get('/all', throwAsNext(controller.getAllMember));
router.get('/', throwAsNext(controller.getMemberById));
router.post('', throwAsNext(controller.createMember));
router.put('/:id', throwAsNext(controller.updateMember));
router.delete('/:id', throwAsNext(controller.deleteMember));

// export
export default { path, router };
