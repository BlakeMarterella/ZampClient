var compName = localStorage.getItem("comp");
var name = compName
document.getElementById('compName').innerText = localStorage.getItem("alias");


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      if(user != null){
             
      }
  
    } else {
      // No user is signed in.
      window.location.href = "index.html";
    }
  });

  //Loads the company's profile
function loadProfile(items) {
    console.log(name);
    
    items.forEach( item => {
       document.getElementById('compName').innerText = item.alias
       document.getElementById('template').value = item.tempText;
       document.getElementById('comp').placeholder = item.compName;
       document.getElementById('alias').value = item.alias;
       document.getElementById('title').innerHTML = item.alias;
       document.getElementById('image').src = item.imageurl
       document.getElementById('small').innerHTML = item.compName;
    });
}

//load data into the HTML table
function loadTableData(items) {
    const table = document.getElementById("employees");
    items.forEach( item => {
      let row = table.insertRow();
      let id = row.insertCell(0);
      let name = row.insertCell(1);
      let lastname = row.insertCell(2);
      let email = row.insertCell(3);
      let address = row.insertCell(4);
      let type = row.insertCell(5);
      
     id.innerHTML = item.id;
      name.innerHTML = item.firstName;
      lastname.innerHTML = item.lastName;
      email.innerHTML = item.email;
      address.innerHTML = item.address;
      type.innerHTML = item.type;
    });
}

//pulls and references the database to grab data
var databaseRef = firebase.database().ref(name+'Employees');
var databaseRefPro = firebase.database().ref(name);

var rowIndex = 1;

databaseRefPro.once('value',function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();
        const items1 = [
            { id: childKey, alias: childData.alias, color: childData.color , imageurl: childData.imageUrl, tempText : childData.templateText, compName: childData.companyName}
        ];
        loadProfile(items1);
    })
})

databaseRef.once('value',function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();
        const items1 = [
            { id: childKey,firstName: childData.firstName, lastName: childData.lastName , email: childData.email, address: childData.address, type : childData.type}
        ];
        loadTableData(items1);
    })
})
  
function updateProfile(){
//     var root = firebase.database().ref();

//    let template =  document.getElementById('template').value;
//     let name = document.getElementById('comp').placeholder; 
//    let alias =  document.getElementById('alias').value;
//    let url = document.getElementById('image').src;
//        var root = firebase.database().ref();
//     // document.getElementById('title').innerHTML; 
//     // document.getElementById('image').src; 
//     // document.getElementById('small').innerHTML;

//     var user = {
//         alias : alias,
//         templateText : template,
//         companyName: name,
//         imageUrl : url,
//     };
//         root.child(this.name).child("randomID0").update(user);
//     location.reload()
}

function addEmployee(){

    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let street = document.getElementById('street').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let country = document.getElementById('country').value
    let email = document.getElementById('email').value
    let priority = document.getElementById('priority').value
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
        state : state
    };
    console.log(firstName)
    console.log(lastName)
    console.log(street)
    console.log(email)
    console.log(city)
    console.log(priority)

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