const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.cookies.tokenname || req.headers?.authorization?.split(" ")[1];
    // console.log("cookie token", token);
   

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decoded", decoded);

        req.user = decoded;
        console.log("req.user", req.user);
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = verifyToken;
