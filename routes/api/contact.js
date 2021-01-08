const express = require('express');

const router = express.Router();

// Contact Model
const Contact = require('../../models/Contact');

// @route GET api/contact
// @desc GET all contacts
// @access Public
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) throw Error('No contacts exist!');
    else res.json(contacts);
  } catch (error) {
    res.status(400).json({ msg: 'Error Client' });
  }
});

// @route POST api/contact/register
// @desc add new user
// @access Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  //Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields! ' });
  }

  // Checking for existing contact
  Contact.findOne({ email }).then((contact) => {
    if (contact)
      return res.status(400).json({ msg: 'Contact already exists!' });

    //Create new Contact
    try {
      const newContact = new Contact({ name, email, password });
      newContact.save();
      res.json(newContact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  });
});

// @route PUT api/contact/edit/:id
// @desc edit a contact by id
// @access Public
router.put('/edit/:id', async (req, res) => {
  const editedContact = ({ name, email, password } = req.body);
  try {
    await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ msg: 'Contact updated' });
    res.json(editedContact);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/contact/delete/:id
// @desc Delete a contact by id
// @access Public
router.delete('/delete/:id', async (req, res) => {
  try {
    await Contact.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: 'Contact Removed!' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
