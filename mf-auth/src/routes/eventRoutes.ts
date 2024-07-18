import EventController from '@/http/controllers/EventController';
import RegistrationController from '@/http/controllers/RegistrationController';
import { authenticate, authorize, confirmRegistrationAuth } from '@/http/middlewares/auth';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.post('/event/:id/register', RegistrationController.store);

eventRouter.put('/event/register-confirm', confirmRegistrationAuth, RegistrationController.update);
eventRouter.use(authenticate)
eventRouter.get('/events', authorize(['organizer']), EventController.index);
eventRouter.post('/event', authorize(['organizer']), EventController.store);
eventRouter.get('/event/:id', EventController.show);
eventRouter.put('/event/:id', authorize(['organizer']), EventController.update);
eventRouter.delete('/event/:id', authorize(['organizer']), EventController.delete);

export default eventRouter;
