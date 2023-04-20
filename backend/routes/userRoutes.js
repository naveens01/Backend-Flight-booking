import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'
import { AddFlight } from '../controllers/flightController.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile)
router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  
  router.post('/admin/add-flight', AddFlight)
  // router.delete('/admin/add-flight', authUser)

  export default router