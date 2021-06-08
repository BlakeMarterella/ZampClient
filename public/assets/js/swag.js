var compName = localStorage.getItem("comp");
var name = compName
var arr = []
var trashArr = []
var childIDArr = []

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
      title: "Image",
      field: "image",
      editor: "none"
    },
    {
      title: "Product Name",
      field: "name",
      width: 250,
      editor: "none"

    },
    {
      title: "Brand",
      field: "brand",
      editor: "none"
    },
    {
      title: "Price",
      field: "price",
      width: 100,
      editor: "none"
    },
    {
      title: "ID",
      field: "id",
      width: 200,
      editor: "none"
    },
  ],
});


document.getElementById('compName').innerText = localStorage.getItem("alias");

var databaseRefPro = firebase.database().ref("Swag");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    table.addRow({
      id: childKey,
      name: childData.title,
      brand: childData.brand,
      image: childData.image,
      price: "$" + childData.price,
      title: childData.title
    });



    //console.log(items1.id);
    //loadItems(items1);
  })
})


function saveEdits() {
  // #employees-table

    firebase.database().ref(this.name + "Swag").remove()
    var id = table.getData();
    //"-MYIH5ATFAFE9UdTFNgn"
    var id = table.getSelectedData();
    var n = 0
    table.getSelectedRows().forEach(element => {
      var em = {
        firstName: id[n].id,
      };
      firebase.database().ref(name + 'Swag').push(em);
      n++;
    }) 
    table.deselectRow("visable"); 
    location.reload()
}

// var databaseRefPro2 = firebase.database().ref(name + "Swag");

// databaseRefPro2.once('value', function (snapshot) {
//   snapshot.forEach(function (childsnapshot) {
//     var childKey = childsnapshot.key;
//     var childData = childsnapshot.val();

//     const dic = {
//       id: childData.id,
//       name: childData.name,
//       price: childData.price,
//       title: childData.title,
//       image: childData.image
//     };
//     console.log(items1.id);
//     arr.push(dic);
//     loadFirebaseTable(items1);
//   })
// })

// var ids = [];
// var counter = 0

// function loadItems(item) {
//   $.each(item, function (i) {
//     var templateString =
//       '<div class="col-md-4">' +
//       '<div class="card mb-2 box-shadow">' +
//       '<img class="card-img" src=' + item[i].image + ' alt="Card image cap">' +
//       '<div class="content">' +
//       '<h5 class="card-title" id="nice">' + item[i].Name + '</h5> ' +
//       '<p class="card-description" id="cool">' + item[i].id + '</p>' +
//       '<br>' +
//       '<button id="press" class="btn btn-primary card-button" onclick="getID(' + counter + ')">Add/Remove Product</button>' +
//       '</div>' +
//       '</div>' +
//       '</div>';

//     $('#cards').append(templateString);
//     const dic = {
//       index: counter,
//       id: item[i].id,
//       name: item[i].Name,
//       price: item[i].price,
//       title: item[i].title,
//       image: item[i].image
//     };
//     ids.push(dic)

//     counter++;
//   })
// }

// function getID(num) {
//   console.log(num);
//   console.log(ids);
//   var i = 0
//   ids.forEach(item => {
//     if (item.index == num) {
//       if (!arr.includes(item)) {

//         const dic = {
//           index: counter,
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           title: item.title,
//           image: item.image
//         };
//         arr.push(dic)
//         childIDArr.push(item.id)
//         loadSelectTable(dic)

//       } else {
//         console.log("its in there");
//         DL1(item.id);
//       }
//       return;
//     }

//   });
// }

// function DL1(elem) {
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

// function loadSelectTable(s) {
//   const table = document.getElementById("swag");

//   let row = table.insertRow();
//   let name = row.insertCell(0);
//   let brand = row.insertCell(1);
//   let unitPrice = row.insertCell(2);
//   let id = row.insertCell(3);
//   id.innerHTML = s.id;
//   name.innerHTML = s.title;
//   brand.innerHTML = s.name;
//   unitPrice.innerHTML = s.price

// }

// function loadFirebaseTable(s) {
//   $.each(s, function (i) {
//     const table = document.getElementById("swag");

//     let row = table.insertRow();
//     let name = row.insertCell(0);
//     let brand = row.insertCell(1);
//     let unitPrice = row.insertCell(2);
//     let id = row.insertCell(3);

//     id.innerHTML = s[i].id;
//     name.innerHTML = s[i].title;
//     brand.innerHTML = s[i].name;
//     unitPrice.innerHTML = s[i].price
//   })
// }

// function save() {
//   firebase.database().ref(this.name + "Swag").remove().then(
//     arr.forEach(element => {
//       var swag = {
//         id: element
//       };
//       firebase.database().ref(this.name + "Swag").push(swag);
//     }),
//     location.reload()
//   );

// }

// function save2() {
//   var cool = 0
//   var nib = 0
//   console.log(childIDArr);
//   arr.forEach(i => {

//     if (childIDArr.length > 0) {
//       childIDArr.forEach(item2 => {

//         if (i != item2[0].id) {
//           var swag = {
//             id: i
//           };

//           console.log("childID: " + item2[0].id + " arr " + i)
//           firebase.database().ref(this.name + "Swag").push(swag);
//         } else {
//         }
//         nib++;
//       })
//       childIDArr.splice(0, 1)
//       save()
//       return
//     } else {
//       var swag = {
//         id: i
//       };
//       firebase.database().ref(this.name + "Swag").push(swag);
//     }
//     cool++;
//   })

//   var i = 0
//   var n = 0

//   trashArr.forEach(item => {
//     childIDArr.forEach(item2 => {
//       console.log("loop");
//       console.log("trash childID: " + item2[n].id + " arr " + trashArr[i])

//       if (trashArr[i] == item2[n].id) {
//         firebase.database().ref(this.name + "Swag").child(item2[n].Childid).remove();
//         console.log("removed");
//       }
//       n++;
//     })
//     i++;
//   }) //need to figure out how to add things 
//   return
//   //need to make an implentation that removes the conent from the database
// }



// //If the array is empty and there arent any
// // products, hide the pricing info card
// if (ids.length < 1) {
//   // document.getElementById("pricing").style.display = "none";
//   document.getElementById("pricing").style.display = "block";
// } else {
//   document.getElementById("pricing").style.display = "block";
// }