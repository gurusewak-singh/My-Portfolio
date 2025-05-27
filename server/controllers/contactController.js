import Contact from '../models/Contact.js';

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  const contact = new Contact({ name, email, message });
  await contact.save();
  res.status(201).json({ success: true });
};
