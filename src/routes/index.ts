import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ClubRoutes } from '../app/modules/club/club.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/club',
    route: ClubRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
