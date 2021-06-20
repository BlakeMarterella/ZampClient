var compName = localStorage.getItem("comp");
var name = compName
var arr = []
var pricePerBox = 0.0;


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

var table = new Tabulator("#swag-table", {
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
  ],
});


let alias = localStorage.getItem('alias')
document.getElementById('compName').innerText = alias

var databaseRefPro = firebase.database().ref("Swag");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();

    const items1 = [{
      id: childKey,
      Name: childData.brand,
      image: childData.image,
      price: childData.price,
      title: childData.title
    }];
    //console.log(items1.id);
    loadItems(items1);
  })
})

var databaseRefPro = firebase.database().ref(name + "Swag");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    arr.push(childKey)
    table.addRow({
      id: childKey,
      name: childData.brand,
      image: childData.image,
      price:  childData.price,
      title: childData.title
    });
    var price = parseFloat(childData.price.replace('$',''));
    pricePerBox = pricePerBox + price
     document.getElementById('boxPrice').innerText = "Price Per Box: $" + Math.round(100*pricePerBox)/100
  })
})

function getID(num) {
  console.log(num);
  console.log(ids);
  var i = 0
  ids.forEach(item => {
    if (item.index == num) {
      if (!arr.includes(item.id)) {

        const dic = {
          index: counter,
          id: item.id,
          name: item.name,
          price: item.price,
          title: item.title,
          image: item.image
        };
        arr.push(item.id)
        loadSelectTable(dic)

      } else {
        console.log("its in there");
      }
      return;
    }

  });
}

function saveEdits() {
  // #employees-table
  //"-MYIH5ATFAFE9UdTFNgn"
      table.selectRow("visible")
      var id = table.getSelectedData();
      var n = 0
      table.getSelectedRows().forEach(element => {

        // table.addRow({
        //   id: childKey,
        //   name: childData.title,
        //   image: childData.image,
        //   price: "$" + childData.price,
        //   title: childData.title
        // });
          var swag = {

            title: id[n].title,
            price: id[n].price,
            id: id[n].id,
          };

          firebase.database().ref(name + 'Swag').child(id[n].id).set(swag);
          table.deselectRow(id[n].id);
          n++;
      }) 
      var swag = {
        costOfOrder: Math.round(100*pricePerBox)/100
      };
    
      firebase.database().ref(name).child("randomID0").update(swag);
    //  location.reload()
}


var ids = [];
var counter = 0

function loadItems(item) {
  $.each(item, function (i) {
    var templateString =
      '<div class="col-md-4">' +
      '<div class="card mb-2 box-shadow">' +
      '<img class="card-img" src=' + item[i].image + ' alt="Card image cap">' +
      '<div class="content">' +
      '<h5 class="card-title" id="nice">' + item[i].Name + '</h5> ' +
      '<p class="card-description" id="cool">' + item[i].id + '</p>' +
      '<br>' +
      '<button id="press" class="btn btn-primary card-button" onclick="getID(' + counter + ')">AddProduct</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    $('#cards').append(templateString);
    const dic = {
      index: counter,
      id: item[i].id,
      name: item[i].Name,
      price: item[i].price,
      title: item[i].title,
      image: item[i].image
    };
    ids.push(dic)

    counter++;
  })
}

// 
function loadSelectTable(s) {

  var id = table.getData();
  table.addRow({
    id: s.id,
    name: s.title,
    brand: s.brand,
    price:  "$" + s.price,
    title: s.title
  });

  var price = parseFloat(s.price);
  pricePerBox = pricePerBox + price
  document.getElementById('boxPrice').innerText = "Price Per Box: $" + Math.round(100*pricePerBox)/100
  //boxPrice
}


//remove selected swag
document.getElementById("delete-row").addEventListener("click", function () {

  var id = table.getSelectedData();
  var counter = 0
  var counter2 = 0
  table.getSelectedRows().forEach(element => {

      const index = arr.indexOf(id[counter].id);
      if (index > -1) {
        arr.splice(index, 1);
      }
      
    var price = parseFloat(id[counter].price.replace('$',''));
    console.log(id[counter].price);
    pricePerBox = pricePerBox - price
    document.getElementById('boxPrice').innerText = "Price Per Box: $" + Math.round(100*pricePerBox)/100

      firebase.database().ref(name + 'Swag').child(id[counter].id).remove();
      table.deleteRow(element);
      counter++;
  });

  var swag = {
    costOfOrder: Math.round(100*pricePerBox)/100
  };

  firebase.database().ref(name).child("randomID0").update(swag);
});


//If the array is empty and there arent any
// products, hide the pricing info card
if (ids.length < 1) {
  // document.getElementById("pricing").style.display = "none";
  document.getElementById("pricing").style.display = "block";
} else {
  document.getElementById("pricing").style.display = "block";
}



//code that would seem important later

//function DL1(elem) {
  //   const table = document.getElementById("swag");
  //   var i = 0;
  //   for (var r = 0, n = table.rows.length; r < n; r++) {
  //     for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
  //       if (table.rows[r].cells[c].innerHTML == elem) {
  //         var i = 0
  //         arr.forEach(item => {
  //           if (item.id == table.rows[r].cells[c].innerHTML) {
  //             console.log(arr.splice(i, 1));
  //             arr.splice(i, 1);
  //             table.deleteRow(i);
  //           }
  //           i++;
  //         })
  //       } else {
  //         i++;
  //       }
  //     }
  //   }
  
  // }
  