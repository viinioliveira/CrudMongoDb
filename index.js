const express = require('express');
const port = 8030
const hostname = '127.0.0.1'

const app = express();

app.listen(port, hostname, function () {
    console.log("servidor iniciado com sucesso!")
})

//conexao mongo
const { MongoClient } = require("mongodb");

// Connection URI
const uri =
    "endereco do seu banco";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {

        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/cadastro', function (req, res) {

    let nome = req.query.nome;
    let email = req.query.email;
    res.send("Dados recebidos com sucesso!")
    gravabd();

    async function gravabd() {

        await client.connect();

        try {
            const Clientes = client.db("Clientes");
            const cadastros = Clientes.collection("cadastro");

            const DadosCadastro = {
                name: `${nome}`,
                email: `${email}`
            };

            const result = await cadastros.insertOne(DadosCadastro);


        } catch (error) {
            console.log(error)
        }

    }


})

