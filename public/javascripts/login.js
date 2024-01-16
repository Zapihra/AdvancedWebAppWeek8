window.onload = function() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const email = form.elements[0].value;
        const passw = form.elements[1].value;

        fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                "email": email,
                "password": passw
            }),
            headers: { 
            'Content-Type': "application/json"} 
        }).then(function (response) {return (response.json())})
        .then(function(res) {
            if(res.success == true) {
                localStorage.setItem('auth_token', res.token)
                window.location.replace('http://localhost:3000/')
            }
            else {
                console.log("something went wrong")
            }
        })



    })
}