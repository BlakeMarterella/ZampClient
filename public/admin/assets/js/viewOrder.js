
//grabs current compamy name
var compName = localStorage.getItem("cName");
document.getElementById('viewOrder').innerHTML = "Viewing Orders for " + compName

//creates tables to display users 
var table = new Tabulator("#orders-table", {
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
            title: "Priority",
            field: "priority",
            editor: "select",
            width: 100,

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

//swag type
var table2 = new Tabulator("#swag-table", {
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 7, //allow 7 rows per page of data
    movableColumns: true, //allow column order to be changed
    resizableRows: true, //allow row order to be changed
    initialSort: [ //set the initial sort order of the data
      {
        column: "name",
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
        title: "ID",
        field: "id",
        editor: "none"
      },
      {
        title: "Product Name",
        field: "name",
        editor: "none"
  
      },
      {
        title: "Price",
        field: "price",
        editor: "none"
      },
    //   {
    //     title: "Brand",
    //     field: "brand",
    //     editor: "none"
    //   },
    ],
  });
  

var counter = 0
//loads darta from firebase
var databaseRef = firebase.database().ref(compName + 'Employees');

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

var databaseRefPro = firebase.database().ref(name + "Swag");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    arr.push(childKey)
    table2.addRow({
      id: childKey,
      brand: childData.brand,
      image: childData.image,
      price:  childData.price,
      name: childData.title
    });
 
  })
})



//Saves users edits
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

//removes selected cells
document.getElementById("delete-row").addEventListener("click", function () {

    var id = table.getSelectedData();
    var counter = 0
    table.getSelectedRows().forEach(element => {
        firebase.database().ref(name + 'Employees').child(id[counter].ID).remove();
        table.deleteRow(element);
        counter++;
    });

});
//creates spread sheet
document.getElementById("download-csv").addEventListener("click", function () {
    table.download("csv", "data.csv");
});

//gets date and time
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function () {
    table.download("xlsx", "data.xlsx", {
        sheetName:  compName + " -- " + date
    });
});