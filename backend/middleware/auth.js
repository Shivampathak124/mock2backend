const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.json({ message: " Please login first" }); 
    }
    jwt.verify(token, 'mockSecret', function (err, decoded) {
        if (err) {
            return res.json({ message: " Invalid Credentials" }); 
        }
        const userId = decoded.userId
        req.userId = userId;
        next()
    })
}

module.exports = {auth}
