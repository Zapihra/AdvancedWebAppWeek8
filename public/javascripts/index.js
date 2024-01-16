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
        }
        else {
            const p = document.createElement("p")
            const button = document.createElement("button")
            const text = document.createElement("input")
            p.innerHTML = res.email
            button.innerHTML = "logout"
            text.type = text
            p.id = "email"
            button.id = "logout"
            text.id = "add-item"
            body.appendChild(p)
            body.appendChild(button)
            body.appendChild(document.createElement("br"))
            body.appendChild(text)
            
            if(res.todos === undefined) {
                for (let i = 0; i < res.todos.length; i++) {
                    const text = document.createTextNode(res.todos[i])
                    body.appendChild(document.createElement("br"))
                    body.appendChild(text)
                }
            }
        }
    })
     
    document.addEventListener("click", function(e) {
        if (e.target.id == "logout") {
            localStorage.removeItem('auth_token')
            location.reload()
        }
    })
    document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            var todo = document.getElementById("add-item").value

            fetch('http://localhost:3000/api/todos', {
                method: "post",
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('auth_token'),
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    "items": todo
                })
            }).then(function (response){console.log(response)})
        }

    })

}