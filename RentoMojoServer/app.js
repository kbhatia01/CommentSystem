const express = require("express")
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dp = mongoose.connect('mongodb://localhost/api');
const port = process.env.PORT || 4100;
const comment = require('./model/CommentSchema')
const router = require("./routes/commentRoute")(comment);
const cors = require('cors');


app.use(cors());

app.use('/api', router);

app.get("/", (req, res) => {
    return res.json("404 Error");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});