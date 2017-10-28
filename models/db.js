const mongoose = require('mongoose');

const uri = 'mongodb://localhost/khoahocfree';
mongoose.connect(uri, { useMongoClient: true });
mongoose.Promise = global.Promise;