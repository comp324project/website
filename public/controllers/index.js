//Handle cookies here

exports.index = (req,res) => {
    console.log(req.session.id);
    console.log(req.session);
    req.session.visited = true;
    res.cookie("hello",{signed:true});
    res.status(201).send({msg: "Hello"});
}