const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const PORT = process.env.PORT || 3500;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload',
    fileUpload({createParentPath: true}),
    (req, res) => {
        const file = req.files;
        console.log(files)
        return res.json({status:'success', message: 'File uploaded successfully'});
    });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));