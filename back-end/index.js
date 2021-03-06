//importation de Express
const express = require('express');
var app = express();

//CORS
var cors = require('cors');
app.use(cors());

//importation de body-parser
const bodyParser = require('body-parser');

//importation du module de cnx à une DB
const db = require('./config/database');

//importation de middleware
const middleware = require('./middleware/authentification');


app.listen(4000, function () {
	console.log('Running on http://127.0.0.1:4000');
});

app.set('secretKey', 'nodeRestApi'); // jwt secret token



//importation des routers
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const categoryRouter = require('./routers/categoryRouter');
const orderRouter = require('./routers/orderRouter');
const subCategoryRouter = require('./routers/subCategoryRouter');
const annonceRouter = require('./routers/annonceRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/category',categoryRouter);
app.use('/subcategory', subCategoryRouter);
app.use('/order', orderRouter);
app.use('/annonce',annonceRouter);

app.get('/home', function (req, res) {
	res.send('Hello home!');
});

app.post('/about', function (req, res) {
	res.send('GOT a POST request');
});
