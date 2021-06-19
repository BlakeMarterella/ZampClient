//window.location.href = "index.html";

function openForm() {
    window.location.href = "addClientView.html";

   // document.getElementById("popupForm").style.display = "block";
}

var databaseRefPro = firebase.database().ref("Companies");
var arr = []

databaseRefPro.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    var childKey = childsnapshot.key;
    var childData = childsnapshot.val();

    const items1 = [{
      id: childKey,
      name: childData.name,
      image: childData.image,
    }];
    //console.log(items1.id);
    loadItems(items1);
  })
})


var ids = [];
var counter = 0
var arr = []


function loadItems(item) {
  $.each(item, function (i) {

    var templateString =
    '<div class="col-md-4">' +
      '<div class="card mb-2 box-shadow">' +
        '<img class="card-img" src=' + item[i].image + ' alt="company picture here">' +
        '<div class="content">' +
          '<h5 class="card-title"><a href="client-info.html">' + item[i].name + '</a></h5> ' +
          '<br>' +
          '<button class="btn btn-fill btn-danger card-button" onclick="removeCompany(' + counter + ')">Delete</button>' + 
          '<button class="btn btn-fill b card-button pull-right" onclick="viewCompany(' + counter + ')">View Orders</button>' +
        '</div>' +
      '</div>' +
    '</div>';
    
    $("#clients").append(templateString);

    const dic = {
      index: counter,
      id: item[i].id,
      name: item[i].name,
    };
    ids.push(dic)

    counter++;
  })
}

function removeCompany(num) {
  console.log(num);
  console.log(ids);
  var i = 0
  ids.forEach(item => {
    if (item.index == num) {
        console.log(item.name);

        firebase.database().ref('Companies').child(item.id).remove();
        location.reload()
      return;
    }

  });
}

function viewCompany(num){
  console.log(num);
  console.log(ids);
  var i = 0
  ids.forEach(item => {
    if (item.index == num) {
        console.log(item.name);
        localStorage.setItem("cName",item.name)
        window.location.href = "viewOrder.html";

      return;
    }

  });
}
