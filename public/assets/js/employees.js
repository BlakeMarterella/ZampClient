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

//custom formatter definition
var printIcon = function(cell, formatterParams, onRendered){ //plain text value
    return "<i class='fa fa-pencil'></i>";
};

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
            titleFormatter: "rowSelection",
            width: 20,
            hozAlign: "center",
            headerSort: false,
            cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }
        },
        {
            formatter:printIcon, 
            width:40, 
            hozAlign:"center", 
            headerSort: false,
            cellClick:function(e, cell)
            {
                alert("Printing row data for: " + cell.getRow().getData().name)
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
            editor: "input",

            
        },
        {
            title: "Email",
            field: "email",
            formatter:"link", formatterParams:{
                labelField:"email",
                urlPrefix:"mailto://",
                target:"_blank",
            }
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
    ],
    rowSelectionChanged: function (data, rows) {
        //update selected row counter on selection change
        document.getElementById("delete-row").innerHTML = "Delete " + data.length + " row(s)";
    },
});


var compName = localStorage.getItem("comp");
var name = compName
var counter = 0
let alias = localStorage.getItem('alias')
document.getElementById('compName').innerText = alias

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
            address: childData.address,
            date: childData.date,
            shipping: childData.shipping,
            recieved: recieved
        });
        counter++;
    })
})

function saveEdits() {
    // #employees-table
    var id = table.getData();
    var counter2 = 1
    var countDown = counter
    while (countDown > 0) {
        countDown--;
    }
    //"-MYIH5ATFAFE9UdTFNgn"
        table.selectRow("visible")
        var id = table.getSelectedData();
        var n = 0
        table.getSelectedRows().forEach(element => {
            if (id[n].address == "") {
                id[n].address = "N/A"
            }
            if (id[n].email == "") {
                id[n].email = "N/A"
            }
            var employee = {

                firstName: id[n].firstname,
                lastName: id[n].lastname,
                email: id[n].email,
                priority: id[n].priority,
                shipping: id[n].shipping,
                address: id[n].address,
                date: id[n].date
            };
            
            var em = {
                company: name,
            };
            firebase.database().ref(name + 'Employees').child(id[n].ID).set(employee);
            var ret = id[n].email.replace('.', '');
            firebase.database().ref("Employees").child(ret).set(em);

            table.deselectRow(id[n].id);
            n++;

        }) 
        console.log("saved")
}

//Functions to download the data from the table
document.getElementById("download-csv").addEventListener("click", function () {
    table.download("csv", "data.csv");
});

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function () {
    table.download("xlsx", "data.xlsx", {
        sheetName:  compName + " -- " + date
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