let User = require('../models/userSchema')

const checkDuplicatedEmail = async (req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email)
            return res.status(400).json({ message: "El email ya existe en la BD" });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = { checkDuplicatedEmail };
