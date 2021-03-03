const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('./db');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3300;

//  middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// create table
db.createTable();

//  api endpoint
app.use('/api', apiRouter);

//  all other endpoints go to frontend
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
