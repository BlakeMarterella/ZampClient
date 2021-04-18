type = ['','info','success','warning','danger'];

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

var color = ""
var compName = localStorage.getItem("comp");
var name = compName

function loadProfile(items) {
    console.log(name);
    
    items.forEach( item => {
    document.getElementById('compName').innerText = item.alias
       document.getElementById('template').value = item.tempText;
       document.getElementById('comp').placeholder = item.compName;
       document.getElementById('alias').value = item.alias;
       document.getElementById('title').innerHTML = item.alias;
       document.getElementById('image').value = item.imageurl
       document.getElementById('small').innerHTML = item.compName;
    });
}

function loadTableData(items) {
    const table = document.getElementById("employees");
    items.forEach( item => {
      let row = table.insertRow();
      let id = row.insertCell(0);
      let name = row.insertCell(1);
      let lastname = row.insertCell(2);
      let email = row.insertCell(3);
      id.innerHTML = item.id;
      name.innerHTML = item.firstName;
      lastname.innerHTML = item.lastName;
      email.innerHTML = item.email;
      color = item.color;
    });
}

var databaseRef = firebase.database().ref(name+'Admin');
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
            { id: childKey,firstName: childData.firstName, lastName: childData.lastName , email: childData.email}
        ];
        loadTableData(items1);
    })
})
  
function updateProfile(){
    var root = firebase.database().ref();

    let template =  document.getElementById('template').value;
    let name = document.getElementById('comp').placeholder; 
     let alias =  document.getElementById('alias').value;
    let url = document.getElementById('image').value;
    console.log(url)
       var root = firebase.database().ref();
    // document.getElementById('title').innerHTML; 
    // document.getElementById('image').src; 
    // document.getElementById('small').innerHTML;

    var user = {
        alias : alias,
        templateText : template,
        companyName: name,
        imageUrl : url,
    };
        root.child(this.name).child("randomID0").update(user);
    location.reload()
}

//Open the popup form
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}