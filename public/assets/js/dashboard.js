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

  var compName = localStorage.getItem("comp");
  var name = compName
  var databaseRefPro = firebase.database().ref(name);

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


function loadProfile(items) {
    console.log(name);
    
    items.forEach( item => {
    document.getElementById('compName').innerText = item.alias
    localStorage.setItem("alias", item.alias); 

    });
}
var databaseRef = firebase.database().ref(name + "Employees");
databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    
      console.log(snapshot.numChildren()); 
      document.getElementById('employeeCount').innerText = snapshot.numChildren()
  })
})


function initChartist() {
  var dates = [];
  var today = new Date();

  for (var i = 0; i < 7; i++){
    var date = today - ( i + 1);
    dates.push(date.toLocaleString());
  }

  var data = {
    labels: dates,
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434]
    ]
  };

  var options = {
      seriesBarDistance: 10,
      axisX: {
          showGrid: false
      },
      height: "245px"
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Line('#chartActivity', data, options, responsiveOptions);
}

initChartist();

$("#slideshow > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
}, 3000);