const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const upload = require("../middleware/multer");

const router = express.Router();

// Routes
router.post("/", upload.single("image"), createEvent);  // Create event (image upload + date included)
router.get("/", getEvents);                             // Get all events
router.get("/:id", getEventById);                      // Get event by ID
router.put("/:id", upload.single("image"), updateEvent); // Update event (image upload + date update)
router.delete("/:id", deleteEvent);                   // Delete event

module.exports = router;