'use strict';

var Faker = require('faker');

const Article = require('./models/Article');
const Comment = require('./models/Comment');

let number_of_articles = 5;
for (let i = 0; i < number_of_articles; i++) {
    new Article({
        title: Faker.lorem.sentence(),
        content: Faker.lorem.paragraphs(5)
    }).save((err, article) => {
        if (err) return console.error(err);

        let number_of_comments = Math.floor(Math.random() * 15) + 10;
        for (let c = 0; c < number_of_comments; c++) {
            new Comment({
                email: Faker.internet.email(),
                comment: Faker.lorem.paragraph(),
                article_id: article._id
            }).save(err => {
                if (err) console.error(err);
            });
        }
    });
}