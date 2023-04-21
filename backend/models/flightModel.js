import mongoose from 'mongoose';

const flightSchema = mongoose.Schema(
  {
    flightName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    airlineName: {
      type: String,
      required: true,
      trim: true
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
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;


// {
// 	"flightName" : "CenterFlight",
//   "airlineName" : "airindia",
//   "departureAirport" : "Munbai",
//   "arrivalAirport" : "bangalore",
//   "departureTime" : 1682066878616,
//   "arrivalTime" : 1682068688551,
//   "price" : "30999",
//   "filledSeats" : 12,
//   "totalSeats" : 60,
//   "flightStatus" : "scheduled "
// }