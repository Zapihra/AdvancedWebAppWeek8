window.onload = function() {
    var button = document.getElementById("logout")

    fetch('http://localhost:3000/api/private', {
        headers: {
        'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
    })
    .then(function (response) {
        if (response.statusText == "Unauthorized") {
            return undefined}
        else {return response.json()}})
    .then(function (res) {
        if(res == undefined) {
            document.getElementById("logout").style.visibility= "hidden";
            document.getElementById("email").style.visibility = "hidden"
            document.getElementById('reg').style.visibility = "visible";
            document.getElementById('login').style.visibility = "visible";
        }
        else {
            var email = document.getElementById("email")
            email.textContent = res.email
            document.getElementById("logout").style.visibility = "visible";
            email.style.visibility = "visible";
            document.getElementById('reg').style.visibility = "hidden";
            document.getElementById('login').style.visibility = "hidden";
    
        }
    })
    
    button.addEventListener("click", function() {
        localStorage.removeItem('auth_token')
        location.reload()
    })


}