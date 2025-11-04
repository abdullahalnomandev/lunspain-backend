import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ClubRoutes } from '../app/modules/club/club.route';
import { PostRoutes } from '../app/modules/post/post.route';
import { CommentRoutes } from '../app/modules/comment/comment.route';
import { ClassRoutes } from '../app/modules/class/class.route';
import { BookingClassRoutes } from '../app/modules/bookingClass/booking.route';
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
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  },
  {
    path: '/book-class-attandence',
    route: BookingClassRoutes,
  },

];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
