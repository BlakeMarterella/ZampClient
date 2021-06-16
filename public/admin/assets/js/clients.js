//window.location.href = "index.html";

function openForm() {
    window.location.href = "addClientView.html";

   // document.getElementById("popupForm").style.display = "block";
}

var templateString =
'<div class="col-md-4">' +
  '<div class="card mb-2 box-shadow">' +
    '<img class="card-img" src=' + 'https://ihfiles.com/products/236/26859/p/4/522808.jpeg' + ' alt="company picture here">' +
    '<div class="content">' +
      '<h5 class="card-title"><a href="client-info.html">' + 'Company Name Here' + '</a></h5> ' +
      '<br>' +
      '<button class="btn btn-fill btn-danger card-button">Delete</button>' +
    '</div>' +
  '</div>' +
'</div>';

$("#clients").append(templateString);