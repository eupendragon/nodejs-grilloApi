const multer = require('multer');
// biblioteca nativa do node que formata caminhos no linux
const path = require('path'); 
const crypto = require('crypto')

module.exports = {
    // destination path
    dest: path.resolve(__dirname, '..', '..', 'uploads', 'resized'),
    storage: new multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'resized')),
        filename: (req, file, cb) => {

            /**
             * É necessário colocar uma hash no nome do arquivo,
             * pois assim é impossível haver imagens com nomes duplicados...
             */
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)
                const filename = `${hash.toString('hex')}-${file.originalname}`
                cb(null, filename)
            })
            cb(null,file.originalname);
        },
        // limites de tamanho de imagem
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        // adicionando filtro de extensão de imagem
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ];
    
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error('Invalid file type'));
            }
        }
    })
};
