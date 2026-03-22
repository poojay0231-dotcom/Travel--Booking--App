const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const destinationRoutes = require("./routes/destination.routes");
const bookingRoutes = require("./routes/booking.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;