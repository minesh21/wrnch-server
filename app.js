require('dotenv').config({path: `./config/${process.env.NODE_ENV}.env`})

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const base = require('./routes/base');
const numerals = require('./routes/numerals');

const compression = require('compression');

app.use(express.json());

app.use(compression())
app.use(express.static(`${__dirname}/build`));

app.use( (req, res, next) => {
    const allowedOrigins = ["https://www.my-app-wrench.herokuapp.com", "https://my-app-wrench.herokuapp.com"]
    
    const isProd = process.env.NODE_ENV === 'production';
    // Allowed origins to access API
    if (isProd && allowedOrigins.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin',  req.headers.origin);
    } 
    
    if (!isProd) {
        res.setHeader('Access-Control-Allow-Origin',  '*');
    }
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

// Listent for these HTTP Request and route appropriately
app.use('/api/v1/base', base);
app.use('/api/v1/numeral', numerals);


// if (process.env.NODE_ENV === 'production') {
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build','index.html'));
//     })
// }


app.listen(port, () => {
    console.log(`Now Listening on port ${port}`);
})