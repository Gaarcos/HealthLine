const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://vinycius:1937468520@eotestas.sbp7rcd.mongodb.net/mydatabase";

mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Conexão com o MongoDB estabelecida com sucesso");
    })
    .catch((error) => {
        console.log("Erro ao conectar com o MongoDB:", error.message);
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;