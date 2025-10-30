import express from 'express';

import {createVacation} from '../controllers/vacationRequests/createVacation.js'
import { updateVacationStatus } from '../controllers/vacationRequests/vacationStatuses.js';
import {getVacations, getVacationsByUser} from '../controllers/vacationRequests/getVacations.js'

import { createVacationSchema, updateVacationStatusSchema } from '../schemas/Vacations.js';

import { validate, validateId, validateUser } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', validate(createVacationSchema), validateUser, createVacation);
router.get('/', getVacations);
router.get('/user/:id', validateId, validateUser, getVacationsByUser);
router.patch('/:id/status', validate(updateVacationStatusSchema), validateId, updateVacationStatus);

export default router;
