const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  batchYear: { type: Number, required: true },
  hostelNumber: { type: String, required: true },
  // In a real production app, password would be hashed. Since the prompt implies a simple mockup, we will store it securely enough for prototype or we can use bcrypt.
  // We'll use simple plain password or minimal handling since it's just a mockup of MERN stack as requested. We installed bcryptjs so let's just plan to hash it in the route.
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
