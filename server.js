const express = require('express');
const AuthController = require("../backend/controllers/AuthController");
const AdminController = require("../backend/controllers/AdminController");
// const LoginController = require("../backend/controllers/LoginController");
const authenticateMiddleware = require("./config/middleware");
const path = require('path');

const app = express();

app.use(express.json());

app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware, AdminController);
// app.use("/login", LoginController);
app.listen(3000, () => {
    console.log('Server rodando na porta 3000')
})


