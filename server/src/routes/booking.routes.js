const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");
const auth = require("../middleware/auth.middleware");

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    const { destinationId, travelers, travelDate } = req.body || {};

    if (!destinationId || !travelers || !travelDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: Number(destinationId) },
    });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const booking = await prisma.booking.create({
      data: {
        reference: `BOOK-${Date.now()}`,
        userId: req.user.userId,
        destinationId: destination.id,
        travelDate: new Date(travelDate),
        travelers: Number(travelers),
        totalAmount: destination.pricePerPerson * Number(travelers),
        status: "pending",
        paymentStatus: "pending",
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// Get current user's bookings
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user.userId,
      },
      include: {
        destination: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Get one booking by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        destination: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
});

// Cancel booking
router.patch("/:id/cancel", auth, async (req, res) => {
  try {
    const bookingId = Number(req.params.id);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "cancelled" },
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

module.exports = router;