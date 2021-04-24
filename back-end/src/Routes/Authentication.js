const Router = require("express").Router();
const {signup, singin, skills, skilledMan, Review} = require("../controllers/Auth");
const {verifyAccessToken} = require("../helper/jwt_helper")

Router.post("/signin",singin);

Router.post("/signup",signup);
Router.put("/skills", verifyAccessToken, skills);
Router.get("/skilled-man/:skills", skilledMan);
Router.post("/review", verifyAccessToken, Review)
module.exports = Router;