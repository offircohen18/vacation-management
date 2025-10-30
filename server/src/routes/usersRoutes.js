import express from 'express';

import { validate, validateId } from '../middlewares/validate.js';

import {createUser} from '../controllers/users/createUser.js'
import {updateUser} from '../controllers/users/updateUser.js'
import {deleteUser} from '../controllers/users/deleteUser.js'
import {getAllUsers, getUserById} from '../controllers/users/getUsers.js'

import { createUserSchema, updateUserSchema } from '../schemas/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id',validateId,  getUserById);
router.delete('/:id',validateId, deleteUser);
router.post('/', validate(createUserSchema), createUser);
router.patch('/:id', validateId, validate(updateUserSchema), updateUser);

export default router;
