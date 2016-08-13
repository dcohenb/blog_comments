'use strict';

const mongoose = require('mongoose');

const db_uri = process.env.DB_URI || 'mongodb://localhost/blog_comments';
mongoose.connect(db_uri);

const db = mongoose.connection;
db.on('error', err => console.error(`connection error: ${err}`));
db.once('open', () => console.log(`DB connection established`));

module.exports.db = db;
module.exports.mongoose = mongoose;