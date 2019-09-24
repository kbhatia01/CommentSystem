const mongoose = require("mongoose");
const Schema = mongoose.Schema;

    const CommentSchema=mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        body:{
            type:String,
            require:true
        },
        upvote: Number,
        downvote: Number
        });

module.exports   = mongoose.model("comment", CommentSchema );