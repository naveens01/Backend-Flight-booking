import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Bookings from '../models/BookingsModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, passenger_dob, password, isAdmin } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    passenger_dob,
    password,
    isAdmin
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      passenger_dob: user.passenger_dob,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getAllBooking = async (req, res) => {
  const allbookings = await Bookings.find().populate(["passengerId", "flightId"])
  res.status(200).send(allbookings)
}

export {
  authUser,
  registerUser,
  getAllBooking
}