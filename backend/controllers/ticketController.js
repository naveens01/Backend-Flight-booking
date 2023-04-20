import asyncHandler from 'express-async-handler'
import Order from '../models/userModel.js'
//import ticket from '../models/ticketModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addTicket = asyncHandler(async (req, res) => {
  const {
    passenger_name,
    passenger_id,
    password,
    passenger_age,
    num_seats,
    email,
    from_place,
    to_place,
    passenger_departure_time,
    passenger_arrival_time,
    amount,

  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No ticket')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdTicket = await order.save()

    res.status(201).json(createdTicket)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getTicketById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (ticket) {
    res.json(ticket)
  } else {
    res.status(404)
    throw new Error('ticket not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateTicketToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedTicket = await ticket.save()

    res.json(updatedTicket)
  } else {
    res.status(404)
    throw new Error('ticket not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isDelivered = true
//     order.deliveredAt = Date.now()

//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Order.find({ user: req.user._id })
  res.json(tickets)
})


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Order.find({}).populate('user', 'id name')
  res.json(tickets)
})

export {
  addTicket,
  getTicketById,
  updateTicketToPaid,
  //updateOrderToDelivered,
  getMyTickets,
  getTickets,
}