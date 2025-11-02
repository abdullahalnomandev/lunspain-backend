import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { PostController } from './post.controller';

const router = express.Router();

router
    .route('/')
    .post(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
        fileUploadHandler(),
        PostController.createPost
    )
    .get(PostController.getAllPosts);

router
    .route('/:id')
    .patch(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
        fileUploadHandler(),
        PostController.updatePost
    )
    .delete(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
        fileUploadHandler(),
        PostController.deletePost
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
        fileUploadHandler(),
        PostController.getSinglePost
    )

router
    .route('/drafts')
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
        PostController.getAllMyDrafts);


export const PostRoutes = router;
