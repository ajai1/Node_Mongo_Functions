const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date:Date
});

const Course = mongoose.model('courses',courseSchema);

async function getPublishedCourse(isPublished){
    const course = await Course.find({isPublished:isPublished, tags:'backend'})
        .limit(10)
        .sort({name:1})
        .select({name:1, tags:1});
    console.log(course);
}

async function getPublishedCourseBasedOnPrice(){
    const course = await Course
        .find({isPublished:true})
        .or([{tags:'backend'}])
        .or([{tags:'frontend'}])
        .sort({price: -1})
        .select({name:1, author:1, tags:1, price:1});
    console.log(course);
}

async function getPublishedCourseMoreThan15(){
    const course = await Course
        .find({isPublished:true})
        .or([
            {price: {$gte: 15}},
            {name: /.*by*./i}
        ])
        .select({name:1, author:1, tags:1, price:1});
    console.log(course);    
}

getPublishedCourseMoreThan15();
//getPublishedCourse(true);
//getPublishedCourseBasedOnPrice();