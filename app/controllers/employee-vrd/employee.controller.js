'use strict';
const Employee = require('../../schemas/employeeSchema');
const access = require('../../schemas/accessToken');



exports.postEmployee = (req, res, next) => {
        let newEmployee = new Employee(req.body.providerData[0]);
        let date = new Date();
        newEmployee.creationTime = date;
        var promise = newEmployee.save();
        promise.then((result) => {
            setAccesstoken(req.body,res);
        },(error) => {
            /****  no need to save if it is duplicate.
             create a session in backend with the userid,createdDate and the access token to the access token table
            *****/
            if(error.code === 11000 || error.code === 11001 ){
                setAccesstoken(req.body,res);
            } else {
                res.status(400);
                res.json(error).end();
            }
        });
};


 //saving access token to database
 function setAccesstoken(data,res){
    let accessToken = new access();
    let date = new Date();
    accessToken.accessToken = data.stsTokenManager.refreshToken;
    accessToken.creationTime = date;
    accessToken.uid = data.providerData[0].uid;
    var promise = accessToken.save();
    promise.then((result) => {
        console.log("------Created accessToken successfully")
        res.status(201);
        res.json(result).end();  
    },(error) => {
        if(error.code === 11000 || error.code === 11001 ){
             console.log("access token to deleted")
             deleteAccessToken(data,res);
        } else {
            res.status(400);
            res.json(error).end();
        }
    });
};

//deleting the previous accessToken and inserting the new one
function deleteAccessToken(data,res){
  access.deleteOne({uid:data.providerData[0].uid} ,(error,result) => {
    if(error) {
        res.status(400);
        res.json(error).end();
    } else {
        console.log("Deleted accessToken successfully---- "+result);
        setAccesstoken(data,res);
    }
  });
}