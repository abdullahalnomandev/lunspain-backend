import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import fileUploadHandler from '../../../middlewares/fileUploadHandler';
import { CommentController } from './comment.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    CommentController.createComment
  )
  .get(CommentController.getAllComments);

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    CommentController.updateComment
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CommentController.deleteComment
  )
  .get(CommentController.getAllComments);

export const CommentRoutes = router;
