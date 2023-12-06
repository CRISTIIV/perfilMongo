const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    id: { type: String },
    account_email: { type: String },
    account_name: { type: String },
});

module.exports = mongoose.model('Profile', ProfileSchema);