import express from 'express';

import {
  authUser,
  hashUser,
  userUpdate,
  userDelete,
} from '../controllers/userController';
import {
  roomFetch,
  roomPost,
  roomUpdate,
  roomDelete,
} from '../controllers/roomController';

const router = express.Router();

// CRUD ops for users
router.route('/users/:id')
  .get(authUser)
  .post(hashUser)
  .put(userUpdate)
  .delete(userDelete);

// CRUD ops for rooms
router.route('/rooms/:id')
  .get(roomFetch)
  .post(roomPost)
  .put(roomUpdate)
  .delete(roomDelete);

module.exports = router;
