let User = require("../models/signupSchema");
let Review = require("../models/reviewSchema")
const bcrypt = require("bcrypt");
const {signAccessToken} = require("../helper/jwt_helper")
const logger = require("../../Config/logger")

exports.singin = (req,res) =>{
    const {userName,password} = req.body;
    User.findOne({userName},(err,foundUser)=>{
        // console.log(foundUser);
        //kindly run
        if(foundUser){
            bcrypt.compare(password,foundUser.password,(err,result)=>{
                if (result){
                    const token = signAccessToken(foundUser._id, foundUser.userName).then(ress => {
                        logger.log("info", userName + " - login successful");
                        return res.status(200).send({ status: 'ok', token: ress, user:foundUser.userName }) 
                    })
                    // console.log(token,foundUser);

                }else if(err){
                    console.log(err);
                    logger.log("error",err);
                    res.status(400).send({msg : "error found"})
                }else{
                    res.status(400).send({msg: "invalid username / password"});
                    logger.log("info", userName + " - invalid username / password")
                }
                   

            })
        } else {
            res.status(400).send({msg: "invalid username / password"});
            logger.log("info","invalid username / password")
        }
    })
}



exports.signup = (req,res) =>{
    const userName= req.body.userName;
    const email= req.body.email;
     const mobile= req.body.mobile;
     const password= req.body.password;
     bcrypt.hash(password,10,(err,hash)=>{
         const newSignup = new User({
            userName,email,mobile,password:hash
         });
         newSignup.save(err=>{
             if(err){
                 console.log(err);
                 logger.log("error",err)
                 res.send("There is some error");
             }else{
                 logger.log("info",userName+" - user registered successfully")
                 res.send("Data is saved succesfully");
             }
         });
     });
}

exports.skills = (req,res) =>{
   
        User.updateOne({_id: req.payload.id},{ $set: { skills: req.body.skill }}, (err)=>{
            if (!err){
                logger.log("info",req.payload.id + " - skills updated successfully")
                res.send("data is updated successfuly")
            }else{
                logger.log("error",err)
                res.send(err)
            }
        })

}

exports.skilledMan = (req,res) =>{
        console.log(req.params);
            User.find({skills:req.params.skills},(err,founduser)=>{
                if (!err){
                    logger.log("info", req.params.skills + " - user found")
                    res.send(founduser)
                }else{
                    logger.log("error",err)
                    res.send(err)
                }
            })

    }

    exports.Review = (req,res) =>{
        const { userId, reviewMsg ,name} = req.body
        
        const newReview = new Review({
            userId,reviewMsg,name
         });
         newReview.save(err=>{
             if(err){
                logger.log("error",err)
                 console.log(err);
                 res.send("There is some error");
             }else{
                 logger.log("info",name + " - review saved succesfully")
                 res.send("Data is saved succesfully");
             }
         });
        }
    
        exports.reviewMan = (req,res) =>{
            console.log(req.params);
            Review.find({userId:req.params.userID},(err,founduser)=>{
                    if (!err){
                        logger.log("info",req.params.userID+ " - review found")
                        res.send(founduser)
                    }else{
                        logger.log("error",err)
                        res.send(err)
                    }
                })
    
        }       