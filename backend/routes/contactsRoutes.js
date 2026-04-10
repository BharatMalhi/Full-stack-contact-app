const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getContacts, createContact, updateContact, deleteContact } = require("../controllers/contactsController");

router.route("/").get(protect, getContacts).post(protect, createContact);
router.route("/:id").put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;
