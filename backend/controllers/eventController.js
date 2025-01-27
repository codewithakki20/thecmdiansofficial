const Event = require("../models/eventModel");
const cloudinary = require("../config/cloudinary");

const createEvent = async (req, res) => {
  try {
    const { title, description, location, price, date } = req.body;

    if (!req.file || !title || !description || !location || !price || !date) {
      return res.status(400).json({ message: "All fields and an image are required" });
    }

    const eventDate = new Date(date);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "events",
    });

    const newEvent = new Event({
      title,
      description,
      location,
      price,
      date: eventDate,
      image: {
        url: result.secure_url,
        cloudinary_id: result.public_id,
      },
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, location, price, date } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(event.image.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      event.image = {
        url: result.secure_url,
        cloudinary_id: result.public_id,
      };
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.price = price || event.price;
    event.date = date ? new Date(date) : event.date;

    const updatedEvent = await event.save();
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await cloudinary.uploader.destroy(event.image.cloudinary_id);
    await event.remove();
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};