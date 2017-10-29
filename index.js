const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({ extended: false });

require('./models/db');
const Course = require('./models/Course');
const Video = require('./models/Video');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', async (req, res) => {
    try {
        const courses = await Course.find({}).populate('videos');
        // courses = courses.videos.sort();
        res.render('home', { courses });
    } catch (err) {
        res.send(err);
    }
});

app.get('/addcourse', (req, res) => {
    res.render('addcourse');
});

app.get('/addvideo', (req, res) => {
    res.render('addvideo');
});

const tachChuoi = (end, str) => {
    return str.slice(0, str.indexOf(end));
};
app.post('/addvideo', parser, async (req, res) => {
    const { idkhoahoc, name, link } = req.body;
    //Name
    let arr1 = name.split('/></a><br><b>');
    let arrName = [];
    arr1.splice(0, 1);
    for (let i = 0; i < arr1.length; i++) {
        arrName.push(tachChuoi('.mp4', arr1[i]));
    }

    //Link
    let arr2 = name.split('href="');
    let arrLink = [];
    arr2.splice(0, 1);
    for (let i = 0; i < arr2.length; i++) {
        arrLink.push(tachChuoi('" target="', arr2[i]));
    }

    for (let i = 0; i < arrName.length; i++) {
        for (let j = 0; j < arrLink.length; j++) {
            if (i === j) {
                const video = new Video({ name: arrName[i], link: arrLink[i] });
                await video.save();
                await Course.findByIdAndUpdate(idkhoahoc, {
                    $push: {
                        videos: video
                    }
                });
            }
        }
    }
    res.render('addvideo');
});

app.post('/addcourse', parser, (req, res) => {
    const { name, link, price } = req.body;
    const course = new Course({ name, link, price });
    course.save()
        .then(() => res.redirect('/'))
        .catch(err => res.send(err.message));
});

app.listen(3009, () => console.log('Server Started'));