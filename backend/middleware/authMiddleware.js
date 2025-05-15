const jwt = require("jsonwebtoken");


const User = require("../models/User");

async function verifyAdmin(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Akses ditolak. Tidak ada token." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Akses ditolak. Anda bukan admin." });
        }

        req.user = user; // Simpan data user untuk digunakan di route
        next();
    } catch (error) {
        res.status(401).json({ message: "Token tidak valid" });
    }
}


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Simpan user info di req
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken,verifyAdmin;
