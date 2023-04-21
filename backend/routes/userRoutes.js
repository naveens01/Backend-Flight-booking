import express from 'express'
const router = express.Router()
import { authUser, registerUser, getAllBooking } from '../controllers/userController.js';
import { AddFlight, removeFlight } from '../controllers/flightController.js'
import { FlightBooking } from '../controllers/bookingController.js';


router.route('/register').post(registerUser)
router.post('/login', authUser)
router.post('/new-booking', FlightBooking)
router.post('/admin/add-flight', AddFlight)
router.delete('/admin/remove-flight', removeFlight)
router.get('/admin/all-booking', getAllBooking)

export default router

