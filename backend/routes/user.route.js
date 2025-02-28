const express = require('express');
const {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

module.exports = router;
