const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const contact = await Contact.create({ user: req.user.id, name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getContacts, createContact, updateContact, deleteContact };
