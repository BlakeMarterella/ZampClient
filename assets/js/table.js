var table = new Tabulator("#employees-table", {
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:30,         //allow 30 rows per page of data
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,       //allow row order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"lastname", dir:"asc"},
    ],
    columns:[                 //define the table columns
        {title:"First Name", field:"firstname", editor:"input"},
        {title:"Last Name", field:"lastname", editor:"input"},
        {title:"Priority", field:"priority", editor:"select", editorParams:{values:["low", "medium", "high"]}},
        {title:"Email", field:"email", editor:"input"},
        {title:"Address", field:"address", editor:"input"},
        {title:"Date Entered", field:"date", editor:"input"},
        {title:"Shipping Number", field:"shipping", editor:"input"},
        {title:"Recieved", field:"recieved", width:120, hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:false},
        {title:"ID", field:"ID", width:200, editor:"none", editorParams:{values:["male", "female"]}},
        // {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
        // {title:"Color", field:"col", width:130, editor:"input"},
        // {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
        // {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    ],
});


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

  //Loads the company's profile
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

databaseRef.once('value', function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();

        var address = childData.street + ", " + childData.city + " " + childData.state + ", " + childData.country;
        var recieved = false;
        
        if (childData.shipping.localeCompare("none")) {
            recieved = true;
        }

        table.addRow({id: childKey, firstname: childData.firstName, lastname: childData.lastName, priority:childData.priority, email: childData.email, address:address, date:childData.date, shipping:childData.shipping, recieved:recieved});
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

function addEmployee(){

    let firstName = document.getElementById('firstname').value
    let lastName = document.getElementById('lastname').value
    let street = document.getElementById('street').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let country = document.getElementById('country').value
    let email = document.getElementById('email').value
    let priority = document.getElementById('priority').value
    let date = new Date().toLocaleString()
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

//Open the popup form
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}