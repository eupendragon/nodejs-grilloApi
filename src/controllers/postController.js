const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        // retorna os posts por data de criação
        const posts = await Post.find().sort({'createdAt': -1});

        return res.json(posts);
    },

    async store(req, res){
        const {postTitle, author, place, date, placeEvent, description, hashtags } = req.body;
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
            author,
            place,
            description,
            hashtags,
            date, 
            placeEvent,
            image: fileName,
        });
        
        // Socket IO = Compartilhar Informações em tempo real
        req.io.emit('post', post);

        return res.json(post);
    }
}