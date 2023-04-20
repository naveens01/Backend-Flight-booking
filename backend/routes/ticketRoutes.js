import express from 'express'
const router = express.Router()
import {
  addTicket,
  getTicketById,
  updateTicketToPaid,
  //updateOrderToDelivered,
  getMyTickets,
  getTickets,
} from '../controllers/ticketController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addTicket).get(protect, admin, getTickets)
router.route('/mytickets').get(protect, getMyTickets)
router.route('/:id').get(protect, getTicketById)
router.route('/:id/pay').put(protect, updateTicketToPaid)
router.route('/:id/deliver').put(protect, admin)

export default router