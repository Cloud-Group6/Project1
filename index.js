const express = require('express');
const app = express();
const path = require('path');

const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        //might have to change the filename to something else
        //to get jpg instead of myjpg
        cb(null, path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single ("image") ,(req, res) => {
    res.send("Image uploaded");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});