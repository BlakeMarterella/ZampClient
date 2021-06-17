
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
            title: "Company",
            field: "company",
            editor: "input"
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
    ],
});

function printMe() {
    node.textContent = "Some error message";
}