import DashboardController from '@/http/controllers/DashboardController';
import { authenticate, authorize } from '@/http/middlewares/auth';
import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.use(authenticate)
dashboardRouter.use(authorize(['organizer']))
dashboardRouter.get('/dashboard/events', DashboardController.index);
dashboardRouter.get('/dashboard/statistics', DashboardController.show);
dashboardRouter.get('/dashboard/statistics/:eventId', DashboardController.engagement);

export default dashboardRouter;
