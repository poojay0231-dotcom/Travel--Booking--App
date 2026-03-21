const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");
const auth = require("../middleware/auth.middleware");

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

module.exports = router;