//testing file upload
//npm install express-fileupload

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const PORT = process.env.PORT || 3500;

const app = express();
var filename;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

        return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
);

function getCurrentFilenames() {
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    })
}

// fs.rename(oldPath, newPath, callback)(err => {
//     if (err) return console.error(err)
//     console.log('renamed complete')
// });

getCurrentFilenames();

app.get('/download', function(req, res){
    
    const file = `${__dirname}/files/Screen Shot 2023-01-28 at 10.58.12 PM.png`;
    res.download(file); // Set disposition and send it.
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

