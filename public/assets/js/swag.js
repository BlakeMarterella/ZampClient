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

document.getElementById('compName').innerText = localStorage.getItem("alias");

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
    loadItems(items1);
  })
})

var databaseRefPro = firebase.database().ref(name + "Swag");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();
    const items1 = [{
      id: childKey,
      swagID: childData.id
    }];
   // loadItems(items1);
  })
})

// var arr = [
//     { "Name": "Peter", "Job": "Programmer" },
//     { "Name": "John", "Job": "Programmer" },
//     { "Name": "Kevin", "Job": "Scientist" },
// ];
var ids = [];
var counter = 0

function loadItems(item) {
  $.each(item, function (i) {
    var templateString =
      '<div class="col-md-4"><div class="content"><div class="card mb-2 box-shadow"><img class="card-img" src=' + item[i].image + ' alt="Card image cap"><div class="card-body"><h5 class="card-title" id="nice">' + item[i].Name + '</h5> <label class="card-description" id="cool">' + item[i].id + '</label <br> </p>  <button id="press"  class="btn btn-info btn-fill card-button" onclick="getID(' + counter + ')">Add/Remove Product</button> </div></div></div></div>';
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

function getID(num) {
  console.log(num);
  console.log(ids);
  var i = 0
  ids.forEach(item => {
    if (item.index == num) {
      if (!arr.includes(item.id)) {
        arr.push(item.id)
        const dic = {
          index: counter,
          id: item.id,
          name: item.name,
          price: item.price,
          title: item.title,
          image: item.image
        };
        loadSelectTable(dic)


      } else {
        console.log("its in there");
        DL1(item.id);
      }
      return;
    }

  });
  document.getElementById("selected").innerHTML("bruh");
}

function DL1(elem) {
  const table = document.getElementById("swag");
  var i = 0;
  for (var r = 0, n = table.rows.length; r < n; r++) {
    for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
      if (table.rows[r].cells[c].innerHTML == elem) {
        var i = 0
        arr.forEach(item => {
          console.log(i);
          if (item == table.rows[r].cells[c].innerHTML){
            arr.splice(i,1);
            table.deleteRow(i);
          }
          i++;
        })
      }
      else {
        i++;
      }
    }
  }
}

function loadSelectTable(s) {
  const table = document.getElementById("swag");

  let row = table.insertRow();
  let name = row.insertCell(0);
  let brand = row.insertCell(1);
  let unitPrice = row.insertCell(2);
  let id = row.insertCell(3);
  id.innerHTML = s.id;
  name.innerHTML = s.title;
  brand.innerHTML = s.name;
  unitPrice.innerHTML = s.price



}

function save() {

  arr.forEach(i => {
    var swag = {
      id: i
    };
    firebase.database().ref(this.name + "Swag").push(swag);

  })
  //need to make an implentation that removes the conent from the database 
}



//If the array is empty and there arent any
// products, hide the pricing info card
if (ids.length < 1) {
  // document.getElementById("pricing").style.display = "none";
  document.getElementById("pricing").style.display = "block";
} else {
  document.getElementById("pricing").style.display = "block";
}