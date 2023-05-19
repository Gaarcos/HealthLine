const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/user");

const router = express.Router();

const generateToken = (user = {}) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
        },
        authConfig.secret,
        { expiresIn: "24h" }
    );
};

router.post("/register", async (req, res) => {

    const {
        email,
        cpf,
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

    res.redirect("/login");
    /*    return res.json({
            error: false,
            message: "Registrado com sucesso",
            data: User,
        });*/

})

router.post("/authenticate", async (req, res) => {
    const { email, senha } = req.body;

    console.log(req.body);

    try {
        const user = await UserModel.findOne({ email }).select("+senha");
        console.log(user);
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "Usuário não encontrado",
            });
        }
        
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return res.status(400).json({
                error: true,
                message: "Senha inválida",
            });
        }

        user.password = undefined;

        return res.json({
            user,
            token: generateToken(user),
        });
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({
            error: true,
            message: "Erro ao autenticar usuário",
        });
    }
});

module.exports = router;