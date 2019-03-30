const access = require('../schemas/accessToken');

exports.lookupAccessToken =  function(req,res,next){
    console.log("------------------------inside lookupAccessToken access token"+req.body.client.uid);
access.find({
    uid: req.body.client.uid,
    accessToken: req.body.client.accessToken
}, (error, result) => {
    if (error) {
        res.status(400);
        res.json(error).end();
    } else {
        if (result.length === 1) {
                console.log("-------Successfully authenticated---------");
                next();
                //findUid(responseToSend, res);
        } else {
            res.req.body.application.message =  "Authentication Failed";
            res.req.body.application.response_action= "hard";
            res.status(201).send(res.req.body);
        }
    }
});
}