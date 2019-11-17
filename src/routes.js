const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

//Profile
const profileController = require('./controllers/profileController')

// Login
const sessionController = require('./controllers/SessionController')

// Post
const postController = require('./controllers/postController')

const routes = new express.Router()
const upload = multer(uploadConfig)

routes.get('/posts', postController.index)
routes.post('/posts', upload.single('image'), postController.store)

routes.get('/profiles', profileController.index)
routes.post('/profiles', upload.single('image'), profileController.store)
routes.get('profile/image', profileController.image)

routes.post('/login', sessionController.login)

module.exports = routes