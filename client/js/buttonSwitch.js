function loginButton(){
    console.log(document.getElementById("login"));
    // const login = document.getElementById("login");
    console.log(document.getElementById("login").getAttribute("value"));
    if(login.getAttribute("value").localeCompare("login")===0){
        document.getElementById("login").innerHTML = "Logout";
        document.getElementById("login").setAttribute("value","logout");
    }
    else{l
        document.getElementById("login").innerHTML = "Login / Sign Up";
        document.getElementById("login").setAttribute("value","login");
    }
}
