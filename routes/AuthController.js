const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/user");

const router = express.Router();

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret, {
        expiresIn: 86400
    });
}

router.post("/register", async (req, res) => {

    const {
        email
    } = req.body;
    const {
        cpf
    } = req.body;
    const {
        telefone
    } = req.body;
    if (await UserModel.findOne({
            email
        })) {
        return res.status(400).json({
            error: true,
            message: "email ja cadastrado"
        })
    }
    if (await UserModel.findOne({
            cpf
        })) {
        return res.status(400).json({
            error: true,
            message: "cpf ja cadastrado"
        })
    }
    if (await UserModel.findOne({
            telefone
        })) {
        return res.status(400).json({
            error: true,
            message: "telefone ja cadastrado"
        })
    }

    const User = await UserModel.create(req.body);

    User.password = undefined;

    return res.json({
        error: false,
        message: "Registrado com sucesso",
        data: User,
    });
})

router.post("/authenticate", async (req, res) => {
    
    const {
        email,
        password
    } = req.body;

    console.log(req.body);

    const user = await UserModel.findOne({
        email
    }).select("+password");

    console.log(user);

    if (!user) {
        return res.status(400).json({
            error: true,
            message: 'Usuario nao encontrado'
        })
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({
            error: true,
            message: 'senha invalida'
        })
    }

    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });

})

module.exports = router;