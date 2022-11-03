/**
 * DEVELOPED BY BRUNO LEONE AT ACETIME SOLUÇÕES DIGITAIS LTDA
 */

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const { v4 } = require('uuid');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const products = [
    { id: "d712e24d-32e0-4e8a-88a6-fead7a0a71fc", descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
    { id: "8715a3d4-23a9-4c6a-83cf-3a23a80f1f2a", descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
    { id: "8061ed41-4eef-4399-9a83-20a775cc93df", descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
    { id: "2f01d862-0df9-42cb-88e8-1898d95b704d", descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
    { id: "1e8eb730-1d99-4a00-9067-8979aa6df7c4", descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
];

app.get('/', (req, res) => {
    res.status(200).send({ status: 200, message: 'Salve!' })
});

/**
 * GET PRODUCTS
 */
app.get('/produtos', (req, res) => {
    res.status(200).send(products);
});

/**
 * GET PRODUCT BY ID
 */
app.get('/produtos/:id', (req, res) => {
    const id = req.params?.id;

    if (!id) {
        res.status(400).send({ statusCode: 400, message: 'Expected id param' })
    }

    const product = products.find(product => product.id == id);

    if (!product) {
        res.status(404).send({ message: 'This product_id is not saved.', status: 404 });
    }

    res.status(200).send(product);
});

/**
 * CREATE PRODUCT
 */
app.post('/produtos', (req, res) => {
    const payload = req.body;

    payload.id = v4();

    products.push(payload);

    res.status(201).send(payload.id);
});

/**
 * DELETE PRODUCT
 */
app.delete('/produtos/:id', (req, res) => {
    const id = req.params?.id;

    if (!id) {
        res.status(400).send({ statusCode: 400, message: 'Expected id param' })
    }

    let index = products.findIndex(product => product.id == id);

    products.splice(index, 1);

    res.status(200).send(id);
})

app.listen(3000);