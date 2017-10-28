const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoSchema =  new Schema({
    name: {
        type: String
    },
    link: {
        type: String
    },
});

const Video = mongoose.model('video', VideoSchema) ;

module.exports = Video;