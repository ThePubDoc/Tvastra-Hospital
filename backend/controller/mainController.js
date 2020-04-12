function index(req,res){
    res.render("index")
}

function doctor(req,res){
    res.render("doctor")
}

function hospital(req,res){
    res.render("hospital")
}

function signup(req,res){
    res.render("signUp");
}

module.exports = {
    index : index,
    doctor : doctor,
    hospital : hospital,
    signup : signup
}