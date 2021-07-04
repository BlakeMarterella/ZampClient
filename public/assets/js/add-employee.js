
function addEmployee() {

    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let street = document.getElementById('street').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let country = document.getElementById('country').value
    let email = document.getElementById('email').value
    let date = new Date().toLocaleString()
    var root = firebase.database().ref();
    var e = document.getElementById("priority");
    var priority = e.value;
    var address = ""
    if (street != "" && city != "" && state != "" && country != "") {
         address = street + ", " + city + " " + state + ", " + country;
    }
    else {
        address = "N/A"
    }

    if (priority == "Select Priority") {
        priority = "N/A"
    }
    if (firstName != "" && lastName != "" && email != "") {
        var user = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            priority: priority,
            shipping: "none",
            date: date,
        };


        firebase.database().ref(this.name + "Employees").push(user);
        var em = {
            company: name,
        };
        var ret = email.replace('.', '');
        console.log(ret);
        firebase.database().ref("Employees").child(ret).set(em);
        window.location.href = 'employees.html'
    } else {
        window.alert("Please fill out the required data.")
    }

}
