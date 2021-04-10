var compName = localStorage.getItem("comp");
var name = compName

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

function loadProfile(items) {
    console.log(name);
    
    items.forEach( item => {

      document.getElementById('template').value = item.tempText;
       document.getElementById('comp').placeholder = item.compName;
       document.getElementById('alias').value = item.alias;
       document.getElementById('title').innerHTML = item.alias;
       document.getElementById('image').src = item.imageurl
       document.getElementById('small').innerHTML = item.compName;
    });
}

function loadTableData(items) {
    const table = document.getElementById("employees");
    items.forEach( item => {
      let row = table.insertRow();
      let name = row.insertCell(0);
      let lastname = row.insertCell(1);
      let email = row.insertCell(2);
      let address = row.insertCell(3);
      let type = row.insertCell(4);
      

      name.innerHTML = item.firstName;
      lastname.innerHTML = item.lastName;
      email.innerHTML = item.email;
      address.innerHTML = item.address;
      type.innerHTML = item.type;
    });
}

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
    var root = firebase.database().ref();

   let template =  document.getElementById('template').value;
    let name = document.getElementById('comp').placeholder; 
   let alias =  document.getElementById('alias').value;
   let url = document.getElementById('image').src;
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


//img