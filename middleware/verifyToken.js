const jwt = require('jsonwebtoken')

/*const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};*/

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(403).send('Acceso denegado. No tienes token')

    try {
        const verificacion = jwt.verify(token, process.env.TOKEN_SECRETO)
    } catch (error) {
        return res.status(401).send('Token invalido:' + error)
    }
    next()
}



/*
const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};*/

module.exports = { verifyToken/*, verifyToken, isModerator, isAdmin */};
