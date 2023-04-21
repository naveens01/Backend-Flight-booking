import mongoose from 'mongoose'
//import bcrypt from 'bcryptjs'

const bookingsSchema = mongoose.Schema(
  {
    passengerId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
    },
    flightId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Flight',
    },
   
  },
  {
    timestamps: true,
  }
)
const Bookings = mongoose.model('Booking', bookingsSchema)

export default Bookings