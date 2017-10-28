const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String
    },
    link: {
        type: String
    },
    price: {
        type: String
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'video'
    }]
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;