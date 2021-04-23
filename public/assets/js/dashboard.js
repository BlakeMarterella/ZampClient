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
  var dataSales = {
    labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    series: [
       [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
      [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    high: 800,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: false,
    showPoint: false,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


  var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
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

  Chartist.Bar('#chartActivity', data, options, responsiveOptions);

  var dataPreferences = {
      series: [
          [25, 30, 20, 25]
      ]
  };

  var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
          showGrid: false
      }
  };

  Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  Chartist.Pie('#chartPreferences', {
    labels: ['62%','32%','6%'],
    series: [62, 32, 6]
  });

  var dataSales = {
    labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
    series: [
       [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
      [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
    ]
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    high: 800,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: false,
    showPoint: false,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


  var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
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

  Chartist.Bar('#chartActivity', data, options, responsiveOptions);

  var dataPreferences = {
      series: [
          [25, 30, 20, 25]
      ]
  };

  var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
          showGrid: false
      }
  };

  Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  Chartist.Pie('#chartPreferences', {
    labels: ['62%','32%','6%'],
    series: [62, 32, 6]
  });
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