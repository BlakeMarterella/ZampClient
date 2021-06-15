var firebaseConfig = {
    apiKey: "AIzaSyCl7crXlHPqniJeASl4T1KJEuItdRpv64E",
    authDomain: "projecto-ae74c.firebaseapp.com",
    databaseURL: "https://projecto-ae74c-default-rtdb.firebaseio.com",
    projectId: "projecto-ae74c",
    storageBucket: "projecto-ae74c.appspot.com",
    messagingSenderId: "319216252694",
    appId: "1:319216252694:web:98ab696c38c532d78e4237",
    measurementId: "G-3YYJK8B644"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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


//   var templateString =
//  '<div class="col-md-4">' +
//  '<div class="card mb-2 box-shadow">' +
//  '<img class="card-img" src=' + 'image-url-here'+ ' alt="Card image cap">' +
//  '<div class="content">' +
//  '<h5 class="card-title">' + 'This is my name' + '</h5> ' +
//  '<p class="card-description">' + 'This is my id' + '</p>' +
//  '<p class="card-description">' + 'This is how much stock I have left' + '</p>' +
//  '<br>' +
//  '<button class="btn btn-primary card-button">Edit</button>' +
//  '<button class="btn btn-fill btn-danger card-button pull-right">Delete</button>' +
//  '</div>' +
//  '</div>' +
//  '</div>';
//  $("#cards").append(templateString); 

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

var ids = [];
var counter = 0;

function loadItems(item) {
    $.each(item, function (i) {
        var templateString =
        '<div class="col-md-4">' +
          '<div class="card mb-2 box-shadow">' +
            '<img class="card-img" src=' + item[i].image + ' alt="Card image cap">' +
            '<div class="content">' +
              '<h5 class="card-title">' + item[i].Name + '</h5> ' +
              '<p class="card-description">' + item[i].id + '</p>' +
              '<br>' +
              '<button class="btn btn-primary card-button">Edit</button>' +
              '<button class="btn btn-fill btn-danger card-button pull-right">Delete</button>' +
            '</div>' +
          '</div>' +
        '</div>';

       ('#cards').append(templateString);

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