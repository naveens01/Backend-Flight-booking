import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Bookings from '../models/BookingsModel.js'
import Flight from '../models/flightModel.js';

const FlightBooking = async (req, res) => {
  try {
    const { flightId, noOfSeatsBooked, passengerId } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    if (flight) {
      const { filledSeats, totalSeats } = flight;
      const availableSeats = totalSeats - filledSeats;
      if (noOfSeatsBooked <= availableSeats) {
        flight.filledSeats = flight.filledSeats + noOfSeatsBooked;
        flight.save();
      }
      const result = linkBooking({ passengerId, flightId })
      return res.status(200).json(result);
    }
    return;
  } catch (error) {
    return await res.status(500).json({ message: "err" });
  }
};


const linkBooking = asyncHandler(async ({ passengerId, flightId }) => {
  const user = await User.findById(passengerId)
  const flight = await Flight.findById(flightId)
  const booking = await Bookings.create({
    passengerId,
    flightId
  })
  return { user, flight }
})


export {
  linkBooking,
  FlightBooking,
}