'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

if (process.env.MOCK_DATA || !!~process.argv.indexOf('--mock')) {
    console.log('Generating mock data');
    require('./mock_data');
}

app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(require('./routes/articles'));
app.use(require('./routes/comments'));

app.use((req, res, next) => res.status(404).json('404 Page not found'));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json('An error occurred');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));