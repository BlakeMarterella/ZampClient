var table = new Tabulator("#employees-table", {
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 30, //allow 30 rows per page of data
    movableColumns: true, //allow column order to be changed
    resizableRows: true, //allow row order to be changed
    initialSort: [ //set the initial sort order of the data
        {
            column: "lastname",
            dir: "asc"
        },
    ],
    columns: [ //define the table columns
        {
            formatter: "rowSelection",
            titleFormatter: "",
            width: 20,
            hozAlign: "center",
            headerSort: false,
            cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }
        },
        {
            title: "First Name",
            field: "firstname",
            editor: "input"
        },
        {
            title: "Last Name",
            field: "lastname",
            editor: "input"
        },
        {
            title: "Priority",
            field: "priority",
            editor: "select",
            editorParams: {
                values: ["low", "medium", "high"]
            }
        },
        {
            title: "Email",
            field: "email",
            editor: "input"
        },
        {
            title: "Address",
            field: "address",
            editor: "input"
        },
        {
            title: "Date Entered",
            field: "date",
            editor: "none"
        },
        {
            title: "Shipping Number",
            field: "shipping",
            editor: "input"
        },
        {
            title: "Recieved",
            field: "recieved",
            width: 120,
            hozAlign: "center",
            formatter: "tickCross",
            sorter: "boolean",
            editor: false
        },
        {
            title: "ID",
            field: "ID",
            width: 200,
            editor: "none"
        },
    ],
    rowSelectionChanged: function (data, rows) {
        //update selected row counter on selection change
        document.getElementById("delete-row").innerHTML = "Delete " + data.length + " row(s)";
    },
});


var compName = localStorage.getItem("comp");
var name = compName

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        if (user != null) {

        }

    } else {
        // No user is signed in.
        window.location.href = "index.html";
    }
});


//pulls and references the database to grab data
var databaseRef = firebase.database().ref(name + 'Employees');

databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childsnapshot) {
        var childKey = childsnapshot.key;
        var childData = childsnapshot.val();

        var address = childData.street + ", " + childData.city + " " + childData.state + ", " + childData.country;
        var recieved = false;

        if (childData.shipping.localeCompare("none")) {
            recieved = true;
        }

        table.addRow({
            ID: childKey,
            firstname: childData.firstName,
            lastname: childData.lastName,
            priority: childData.priority,
            email: childData.email,
            address: address,
            date: childData.date,
            shipping: childData.shipping,
            recieved: recieved
        });
    })
})

function updateProfile() {
    var root = firebase.database().ref();

    let template = document.getElementById('template').value;
    let name = document.getElementById('comp').placeholder;
    let alias = document.getElementById('alias').value;
    let url = document.getElementById('image').src;
    var root = firebase.database().ref();
    // document.getElementById('title').innerHTML; 
    // document.getElementById('image').src; 
    // document.getElementById('small').innerHTML;

    var user = {
        alias: alias,
        templateText: template,
        companyName: name,
        imageUrl: url,
    };
    root.child(this.name).child("randomID0").update(user);
    location.reload()
}

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

    if (priority == "Select Priority") {
        priority = "N/A"
    }
    if (firstName != "" && lastName != "" && email != "") {
        var user = {
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            email: email,
            priority: priority,
            shipping: "none",
            country: country,
            state: state,
            date: date
        };


        firebase.database().ref(this.name + "Employees").push(user);
        var em = {
            company: name,
        };
        var ret = email.replace('.', '');
        console.log(ret);
        firebase.database().ref("Employees").child(ret).set(em);
        location.reload()
    }
    else {
        window.alert("Please fill out the required data.")
    }

}

//Open the popup form
function openForm() {
    document.getElementById("wrapper").style.filter = "blur(15px)";
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    //    document.getElementById("wrapper").classList.remove("blur");
    document.getElementById("wrapper").style.filter = "unset";
    document.getElementById("popupForm").style.display = "none";
}

//Functions to download the data from the table
document.getElementById("download-csv").addEventListener("click", function () {
    table.download("csv", "data.csv");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function () {
    table.download("xlsx", "data.xlsx", {
        sheetName: "My Data"
    });
});

//Delete the selected rows and set the text of the button
document.getElementById("delete-row").addEventListener("click", function () {

    var id = table.getSelectedData();
    var counter = 0
    table.getSelectedRows().forEach(element => {
        firebase.database().ref(name + 'Employees').child(id[counter].ID).remove();
        table.deleteRow(element);
        counter++;
    });

});