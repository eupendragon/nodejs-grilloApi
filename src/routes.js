const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');

//Profile
const profileController = require('./controllers/profileController');

// Post
const postController = require('./controllers/postController');
const likeController = require('./controllers/likeController');


const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', postController.index);
routes.post('/posts', upload.single('image'), postController.store);


routes.get('/profiles', profileController.index);
routes.post('/profiles', upload.single('image'), profileController.store);

routes.post('/posts/:id/like', likeController.store);

module.exports = routes;