function addEmployee(){

    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let street = document.getElementById('street').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let country = document.getElementById('country').value
    let email = document.getElementById('email').value
    let priority = document.getElementById('priority').value
    let date = Date.toString()
    var root = firebase.database().ref();
    
    var user = {
        firstName : firstName,
        lastName : lastName,
        street: street,
        city : city,
        email : email,
        priority : priority,
        shipping : "none",
        country : country,
        state : state,
        date: date
    };
    console.log(firstName)
    console.log(lastName)
    console.log(street)
    console.log(email)
    console.log(city)
    console.log(priority)
    console.log(date)

    firebase.database().ref(this.name + "Employees").push(user);
    var em = {
        company : name,
    };
    var ret = email.replace('.','');
    console.log(ret);
    firebase.database().ref("Employees").child(ret).set(em);
    location.reload()

}

//img