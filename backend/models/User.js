const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    phone: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
