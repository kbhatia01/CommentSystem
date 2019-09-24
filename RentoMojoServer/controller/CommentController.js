module.exports = function commentController(cmnt) {

    function patch(req, res) {
        cmnt.findById(req.params.Cid, (err, comment) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                req.cmnt = comment;
                const coment = req.cmnt;
                // console.log(req);

                Object.entries(req.body).forEach((element) => {
                    const key = element[0];
                    const value = element[1];
                    coment[key] = value;

                })
                coment.save((err) => {
                    if (err) {
                        return res.json(err);
                    }
                    else {
                        return res.json(coment);
                    }
                });
            }

        })
    }

    function post(req, res) {
        const ress = new cmnt(req.body);

        ress.save();
        res.status(201)
        return res.json(ress);
    }
    function get(req, res) {
        cmnt.find((err, cmnts) => {
            if (err) {
                return res.send(err);
            }
            return res.json(cmnts);
        })
    }
    return { patch, post, get };
}