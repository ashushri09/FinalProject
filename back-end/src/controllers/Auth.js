let User = require("../models/signupSchema");
let Review = require("../models/reviewSchema")
const bcrypt = require("bcrypt");
const {signAccessToken} = require("../helper/jwt_helper")

exports.singin = (req,res) =>{
    const {userName,password} = req.body;
    User.findOne({userName},(err,foundUser)=>{
        if(foundUser){
            bcrypt.compare(password,foundUser.password,(err,result)=>{
                if (result){
                    const token = signAccessToken(foundUser._id, foundUser.userName).then(ress => {
                        return res.status(200).send({ status: 'ok', token: ress, user:foundUser.userName }) 
                    })
                    // console.log(token,foundUser);

                }else if(err){
                    console.log(err);
                    res.status(400).send({msg : "error found"})
                }else{
                    res.status(400).send({msg: "invalid username / password"});
                }
                   

            })
        } else {
            res.status(400).send({msg: "invalid username / password"});
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
                 res.send("There is some error");
             }else{
                 res.send("Data is saved succesfully");
             }
         });
     });
}

exports.skills = (req,res) =>{
// console.log(req);
// User.findOne({_id: req.payload.id},(err,foundUser)=>{
//     if(foundUser){
    
        User.updateOne({_id: req.payload.id},{ $set: { skills: req.body.skill }}, (res, err)=>{
            console.log(res);
        })
//     }
// })
}

exports.skilledMan = (req,res) =>{
    // console.log(req);
    // User.findOne({_id: req.payload.id},(err,foundUser)=>{
    //     if(foundUser){
        console.log(req.params);
            User.find({skills:req.params.skills},(err,founduser)=>{
                console.log(founduser);
            })
    //     }
    // })
    }

    exports.Review = (req,res) =>{
        const { userId, reviewMsg } = req.body
        const { id: reviewerId } = req.payload
        const newReview = new Review({
            userId,reviewMsg,reviewerId
         });
         newReview.save(err=>{
             if(err){
                 console.log(err);
                 res.send("There is some error");
             }else{
                 res.send("Data is saved succesfully");
             }
         });
        }