(function() {
  var API_KEY = "2025f02125cf24d5d6c033a0d7c641b2",
    USER_ID = "29630858@N05";

  $(function() {
    $cntPhotos = $('#photoList');
    $.get(generateFlickUrl(1, 6))
      .done(function(data) {
        if (data.stat != 'ok') {
          return;
        }
        var listPhotos = createListPhotos(data.photos.photo);
        $cntPhotos.append(listPhotos);
      })
      .fail(function(err) {
        console.log(err);
      })
  });


  function createListPhotos(photoSet) {
    var $listPhotos = photoSet.map(function(photo) {
      var source = flickrImageUrl(photo);
      var description = photo.title;
      var html = '<li><figure>';
      html += '<img src=' + source + ' alt="' + description + '">';
      html += '<span>' + description + '</span></li>';
      return html
    });
    return $listPhotos;
  }

  function flickrImageUrl(photo) {
    var url = 'https://farm' + photo.farm;
    url += '.staticflickr.com/';
    url += photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_n.jpg';
    return url;
  }

  function generateFlickUrl(page, limit) {
    var url = "https://api.flickr.com/services/rest/";
    url += '?method=flickr.photos.getPopular';
    url += '&api_key=' + API_KEY;
    url += '&user_id=' + USER_ID;
    url += '&format=json';
    url += '&per_page=' + limit;
    url += '&page=' + page;
    url += '&nojsoncallback=1';

    return url;
  }
})();
