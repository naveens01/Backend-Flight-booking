import Flight from "../models/flightModel.js";


const AddFlight = async (req, res) => {
  const {
    flightName,
    airlineName,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    price,
    filledSeats,
    totalSeats,
    flightStatus,
  } = req.body;

  const isExisted = await Flight.findOne({ flightName });

  if (isExisted) {
    return res.status(404).json({ message: "Flight already Exist" });
  }
  const flight = await Flight.create({
    flightName,
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
  res.status(200).json(flight);

};

const removeFlight = async (req, res) => {
  try {
    const { flightName } = req.body;
    console.log(flightName);
    const flight = await Flight.findOne({ flightName: flightName });
    if (!flight) {
      console.log("Flight not available");
      return res.status(404).json({ message: "No such Flight avilable..." });
    }
    console.log("Flight available");
    const result = await Flight.deleteOne({ flightName: flightName })
    if (result.acknowledged) {
      return res.status(200).json({ message: " Flight details deleted Successfully" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "err" });
  }
};


export {AddFlight, removeFlight };
