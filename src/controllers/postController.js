const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        // retorna os posts por data de criação
        const posts = await Post.find().sort({'createdAt': -1}).populate('user');

        return res.json(posts);
    },

    async list(req, res) {
        try {
            const post = await Post.findById(req.params.postId).populate('user')
            return res.send({ post })
        } catch (err) {
            return res.status(400).send({ error: 'Error List post' })
        }
    },

    async store(req, res){
        const {postTitle, date, placeEvent, description } = req.body;
        const {filename: image} = req.file;
        // separando imagem em nome e extensão
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // redimensiona a imagem do post para aumento de perfomance
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        // apaga a imagem original    
        fs.unlinkSync(req.file.path); 

        const post = await Post.create({
            postTitle,
            description,
            date, 
            placeEvent,
            image: fileName,
            user: req.userId
        });
        
        // Socket IO = Compartilhar Informações em tempo real
        req.io.emit('post', post);

        return res.json(post);
    },

    async delete(req, res) {
        try {

            await Post.findByIdAndRemove(req.params.postId)

            return res.status(200).send({message: 'Sucess delete'})
            
        } catch (err) {
            return res.status(400).send({ error: 'Error deleting post' })
        }
    },

    async update(req, res) {
        try {
            const {postTitle, description, date, placeEvent} = req.body
            
            const post = await Post.findByIdAndUpdate(req.params.postId,{
                postTitle,
                description, 
                date, 
                placeEvent
            }, {new: true}).populate('user')

            return res.send({post})
            
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Error update post' })
        }
    }
}