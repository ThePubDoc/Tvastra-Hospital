function checkLogin(req,res,next){
    if(req.session.user){
        next();
    }
    else{
        res.redirect("/login")
    }
}

function checkType(req,res,next){
    if(req.session.user.typ === 'admin'){
        
    }
}
module.exports = {
    checkLogin
}