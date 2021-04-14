var tabledata = [
    {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
    {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
    {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
    {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
];

var table = new Tabulator("#employees-table", {
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:30,         //allow 7 rows per page of data
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
        {title:"Recieved", field:"recieved", width:120, editor:"input"},
        // {title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
        // {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
        // {title:"Color", field:"col", width:130, editor:"input"},
        // {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
        // {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    ],
});

table.addRow({id:1, firstname:"James", lastname:"Biser", priority:"high", email:"jbiser361@yahoo.com", address:"123 Sesame Street", date:"19/02/1984", shipping:1, recieved:1});

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

databaseRef.once('value', function(snapshot){
    snapshot.forEach(function(childsnapshot) { 
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();
        const items1 = { id: childKey, firstName: childData.firstName, lastName: childData.lastName , email: childData.email, address: childData.address, type : childData.type};

        table.addRow({id:2, firstname:"Blake", lastname: childData.lastName, priority:"high", email:"jbiser361@yahoo.com", address:"123 Sesame Street", date:"19/02/1984", shipping:1, recieved:1});
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

