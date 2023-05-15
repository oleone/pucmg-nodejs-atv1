/**
 * DEVELOPED BY BRUNO LEONE AT ACETIME SOLUÇÕES DIGITAIS LTDA
 */

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const accountsRouter = require('./routers/accounts');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send({ status: 200, message: 'This service is upped', datetime: Date.now() });
});

app.use('/app', express.static(path.join(__dirname, '/public')))
app.use('/api', accountsRouter);

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));