import mongoose from 'mongoose';

const flightSchema = mongoose.Schema(
  {
    flightName: {
      type: String,
      required: true,
      unique: true,
    },
    airlineName: {
      type: String,
      required: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    filledSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
   
    flightStatus: {
      type: String,
      enum: ['scheduled', 'delayed', 'cancelled'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
