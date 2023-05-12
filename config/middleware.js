const jwt = require("jsonwebtoken");
const authConfig = require("./auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token nao informado"
        })
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "token de formato invalido"
        })
    }

    const [scheme, token] = parts;

    if (scheme.indexOf("Bearer") !== 0) {
        return res.status(401).json({
            error: true,
            message: "token mal-formatado"
        })
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token invalido/expirado"
            })
        }

        req.userLogged = decoded;

        return next();
    })

}