var templateString =
'<div class="col-md-4">' +
'<div class="card mb-2 box-shadow">' +
'<img class="card-img" src=' + 'image-url-here'+ ' alt="Card image cap">' +
'<div class="content">' +
'<h5 class="card-title">' + 'This is my name' + '</h5> ' +
'<p class="card-description">' + 'This is my id' + '</p>' +
'<p class="card-description">' + 'This is how much stock I have left' + '</p>' +
'<br>' +
'<button class="btn btn-primary card-button">Edit</button>' +
'<button class="btn btn-fill btn-danger card-button pull-right">Delete</button>' +
'</div>' +
'</div>' +
'</div>';

$("#cards").append(templateString);