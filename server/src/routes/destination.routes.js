const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

router.get("/", async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug: req.params.slug },
    });

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: "Failed to fetch destination" });
  }
});

module.exports = router;