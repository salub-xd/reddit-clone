const jwt = require("jsonwebtoken");

async function verify(req, res, next) {
    const authHeader = req.headers.token;
    try {
        if (!authHeader) {
            return res.status(404).json({ error: "Token not found" });
        }
        // const token = authHeader.slipt(' ')[1];
        const data = jwt.verify(authHeader, process.env.SECRET_KEY);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(404).json({ error: "Token not found" });
    }
}

module.exports = verify;