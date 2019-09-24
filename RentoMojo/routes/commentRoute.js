const express = require("express")
const commentController=require('../controller/CommentController');

function routes(cmnt) {


const controller=commentController(cmnt);
const router = express.Router(cmnt);
router.route("/comment").post(controller.post);
router.route("/comment").get(controller.get);
router.route("/comment/:Cid").patch(controller.patch);
return router;

}

module.exports = routes;