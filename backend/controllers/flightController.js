import Flight from "../models/flight.js";

const FlightBooking = async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    if (flight) {
      const { filledSeats, totalSeats } = flight;
      const isAvailable = filledSeats < totalSeats;
      res.status(200).json({ isAvailable });
    }
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "err" });
  }
};

const AddFlight = async (req, res) => {
  const {
    flight_name,
    airlineName,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    price,
    filledSeats,
    totalSeats,
    flightStatus,
  } = res.body;

  const isExisted = await Flight.findOne({ flight_name });

  if (isExisted) {
    return res.status(404).json({ message: "Flight already Exist" });
  }
  const flight = await Flight.create({
    flight_name,
    airlineName,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    price,
    filledSeats,
    totalSeats,
    flightStatus,
  });
  res.status(200).json(flights);
  

};
const removeFlight = () => {};

module.exports = { FlightBooking, AddFlight, removeFlight };
