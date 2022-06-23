const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoSession = require('connect-mongodb-session')(session);
const { authenticate } = require('./middlewares/');

// Environment config
require('dotenv').config();

// Express setup
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request validator
app.use((err, _, res, next) => {
    if (err.status === 400 && err instanceof SyntaxError) {
        return res.sendStatus(400);
    }
    next();
});

// Database connection
const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
.then(() => console.log("Connected to Database!"))
.catch(err => console.log(err));

const mongoSessionsStore = new MongoSession({
    uri: dbUri,
    collection: "sessions"
});

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoSessionsStore,
    cookie: {
        httpOnly: true
    }
}));

// Authentication
app.use(authenticate);

// Routings
const apiV1Route = require('./api/v1/api');
app.use('/api/v1', apiV1Route);

app.get('/', (req, res) => {
    res.sendStatus(400);
});

// App run
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

module.exports = app;