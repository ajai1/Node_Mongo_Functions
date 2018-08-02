const mongoose = require('mongoose');
//Connecting to the DB
mongoose.connect('mongodb://localhost/mongo-exercises');
//Schema References
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date:{type:Date, default:Date.now}
});
//Model is created to do the operations on the DB
const Course = mongoose.model('courses',courseSchema);

//read functions{
    async function getPublishedCourse(isPublished){
        //get only the published Course
        const course = await Course.find({isPublished:isPublished, tags:'backend'})
            .limit(10)
            .sort({name:1})
            .select({name:1, tags:1});
        console.log(course);
    }
    
    async function getPublishedCourseBasedOnPrice(){
        //get Published Course on sorting the Price in Desc
        const course = await Course
            .find({isPublished:true})
            .or([{tags:'backend'}])
            .or([{tags:'frontend'}])
            .sort({price: -1})
            .select({name:1, author:1, tags:1, price:1});
        console.log(course);
    }
    
    async function getPublishedCourseMoreThan15(){
        //get Published Course which has the price more than or equal to 15 || the name containing 'by' in it
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
//}

// create function{
    async function createCourse(){
        const course = new Course({
            name: 'MEAN Stack Course',
            author: 'Ajai Kumar',
            tags: [ 'frontend', 'backend' ],
            price: 22,
            isPublished: true
        });

        const result = await course.save();
        console.log(result);
    }

    //createCourse();
//}

