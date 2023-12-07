import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Hola")
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

let products = [{id:1, nombre:"marcos"}, {id:2, nombre:"sofia"}, {id:3, nombre:"felipe"}, {id:4, nombre:"paulina"}];

app.get("/products", (req, res) => {
    let temporalProducts = products;
    const {limit} = req.query;

    if (limit) {temporalProducts = temporalProducts.slice(0, +limit);}

    res.json({
        message:"Lista de Productos",
        data: temporalProducts
    })})
