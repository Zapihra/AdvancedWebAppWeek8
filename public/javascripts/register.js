window.onload = function() {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = form.elements[0].value;
        const passw = form.elements[1].value;
        
        fetch("http://localhost:3000/api/user/register", {
            method: 'post',
            body: JSON.stringify({
                "email": email,
                "password": passw
            }),
            headers: { 
            'Content-Type': "application/json"} 
        }).then(function (response) {return response.json()})
        .then(function (res) {
            if (res.res == "ok"){
                window.location.replace('http://localhost:3000/login.html')
            }
        })

    })
}


