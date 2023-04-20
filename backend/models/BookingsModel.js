import mongoose from 'mongoose'
//import bcrypt from 'bcryptjs'

const bookingsSchema = mongoose.Schema(
  {
    passenger_name: {
      type: String,
      required: true,
    },
    passenger_id: {
        type: Number,
        required: true,
        unique: true,
      },
      flight_name: {
        type: String,
        required: true,
      },
      flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Flight",
        required: true,
      },
    email: 
    {
      type: String,
      required: true,
      unique: true,
    },
    from_place: 
    {
      type: String,
      required: true,
    },
    to_place:{
        type: String,
        required : true,
    },
    passenger_departure_time: 
    {
        type: Date,
        required: true,
      },
      passenger_arrival_time: 
      {
        type: Date,
        required: true,
      },
    amount:
      {
        type : Number,
        required: true,
      },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

  },
  {
    timestamps: true,
  }
)
const Bookings = mongoose.model('Booking', bookingsSchema)

export default Bookings