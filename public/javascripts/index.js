window.onload = function() {

    fetch('http://localhost:3000/api/private', {
        headers: {
        'Authorization': 'bearer ' + localStorage.getItem('auth_token')}
    })
    .then(function (response) {
        if (response.statusText == "Unauthorized") {
            return undefined}
        else {return response.json()}})
    .then(function (res) {
        var body = document.getElementById("body")
        
        if(res == undefined) {
            const a1 = document.createElement("a")
            const a2 = document.createElement("a")
            a1.innerHTML = "register <br>"
            a2.innerHTML = "login"
            a1.href ="/register.html"
            a2.href ="/login.html"
            a1.id = "reg"
            a2.id = "login"
            body.appendChild(a1)
            body.appendChild(a2)
            body.removeChild(document.getElementById("logout"))
            body.removeChild(document.getElementById("email"))
        }
        else {
            const p = document.createElement("p")
            const button = document.createElement("button")
            p.innerHTML = res.email
            button.innerHTML = "logout"
            p.id = "email"
            button.id = "logout"
            body.appendChild(p)
            body.appendChild(button)
            body.removeChild(document.getElementById("reg"))
            body.removeChild(document.getElementById("login"))
    
        }
    })
     
    document.addEventListener("click", function(e) {
        if (e.target.id == "logout") {
            localStorage.removeItem('auth_token')
            location.reload()
        }
    })


}