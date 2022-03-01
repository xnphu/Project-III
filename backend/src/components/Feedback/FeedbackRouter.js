import { Router } from 'express';
import * as controller from './FeedbackController';
import { throwAsNext, authMiddleware, requireLogin, requireAdminRole, checkNotUserRole } from '../../middleware';

const path = '/feedback';
const router = Router();

// route
router.get('', throwAsNext(controller.getAllFeedbacks));
router.get('/:id', throwAsNext(controller.getFeedbackById));
router.get('/:id/member', throwAsNext(controller.getFeedbackByMemberId));
router.post('', throwAsNext(controller.createFeedback));
router.put('/:id', throwAsNext(controller.updateFeedback));
router.delete('/:id', throwAsNext(controller.deleteFeedback));

// export
export default { path, router };
