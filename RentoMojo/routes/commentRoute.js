const express = require("express")
const commentController=require('../controller/CommentController');

function routes(cmnt) {


const controller=commentController(cmnt);
const router = express.Router(cmnt);
return router;

}

module.exports = routes;