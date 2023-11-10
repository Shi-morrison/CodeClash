const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const mongoURI = 'your_mongodb_uri';

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'profilePics'
    });
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: 'file_' + Date.now(),
            bucketName: 'profilePics'
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
