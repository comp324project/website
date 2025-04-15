const path = require('path');

//Handle cookies?
exports.index = (req,res) => {
    console.log(req.session.id);
    console.log(req.session);
    req.session.visited = true;
    //res.cookie("hello",{signed:true});
    res.status(201).send({msg: "Hello"});
    res.render("index.html")
}

exports.login = (req,res) => {
    res.sendFile(path.join(__dirname, '../html/login.html'));
}

exports.home = (req,res) => {
    if (!req.user){
        res.redirect("/login")//Redirect sends user to specified relative url
    }
    res.sendFile(path.join(__dirname, '../html/home.html'));
}

exports.create = (req,res) => {
    if (!req.user){
        res.redirect("/login")//Redirect sends user to specified relative url
    }
    res.sendFile(path.join(__dirname, '../html/create.html'));
}
exports.resume = (req,res) => {
    if (!req.user){
        res.redirect("/login")//Redirect sends user to specified relative url
    }
    res.sendFile(path.join(__dirname, '../html/master-resume.html'));
}
exports.analytics = (req,res) => {
    if (!req.user){
        res.redirect("/login")//Redirect sends user to specified relative url
    }
    res.sendFile(path.join(__dirname, '../html/data-viz.html'));
}
exports.profile = (req,res) => {
    if (!req.user){
        res.redirect("/login")//Redirect sends user to specified relative url
    }
    res.sendFile(path.join(__dirname, '../html/profile.html'));
}