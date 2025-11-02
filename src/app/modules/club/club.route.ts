import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ClubController } from './club.controller';
import { ClubValidation } from './club.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    ClubController.createClub
  )
  .get(ClubController.getAllClubs);

router
  .route('/:id')
  .get(ClubController.getSingleClub)
  .patch(
    auth(USER_ROLES.ADMIN),
    validateRequest(ClubValidation.updateClubZodSchema),
    ClubController.updateClub
  )
  .delete(auth(USER_ROLES.ADMIN), ClubController.deleteClub);

router
  .route('/:clubId/members')
  .post(
    auth(USER_ROLES.ADMIN),
    ClubController.addMemberToClub
  );

router
  .route('/:clubId/members/:userId')
  .delete(auth(USER_ROLES.ADMIN), ClubController.removeMemberFromClub);

router
  .route('/creator/:creatorId')
  .get(ClubController.getClubsByCreator);

export const ClubRoutes = router;
